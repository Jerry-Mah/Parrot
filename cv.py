from ultralytics import YOLO
import cv2
import time
import socketio
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load YOLOv8 model
model = YOLO("best.pt")  # Replace with 'yolov8s.pt', 'yolov8m.pt', etc., if needed

# Initialize Socket.IO client
sio = socketio.Client(logger=True, engineio_logger=True)

# Connect to Socket.IO server
try:
    sio.connect('http://localhost:5001')
    logger.info("Connected to Socket.IO server")
except Exception as e:
    logger.error(f"Failed to connect to server: {e}")

# Set up video capture (0 for webcam, or replace with video file path)
cap = cv2.VideoCapture(1)

# Initialize last prompt time to 0
last_prompt_time = 0
prompt_interval = 10 * 60  # 10 minutes in seconds

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLOv8 inference
    results = model(frame)

    # Check for 'person' class detections (class ID 0)
    found_person = any(detection.cls == 1. for detection in results[0].boxes)
    for detection in results[0].boxes:
        print(detection)

    # Get current time
    current_time = time.time()

    # If a person is detected and 10 minutes have passed since the last prompt, ask the user
    if found_person and (current_time - last_prompt_time >= prompt_interval):
        print("Found")

        # Ask user if they want to stop
        user_input = input("Fault detected. Do you want to stop the webcam? (yes/no): ").strip().lower()
        
        if user_input == "yes":
            print("Stopping webcam...")
            #emit code
            try:
                sio.emit('fault_detected', {
                    'fault_type': 'stringing',
                    'timestamp': time.time()
                })
            except Exception as e:
                logger.error(f"Failed to emit fault detection: {e}")
            break
        else:
            # Update last prompt time to current time
            last_prompt_time = current_time

    # Display results on the frame
    annotated_frame = results[0].plot()
    cv2.imshow("YOLOv8 Detection", annotated_frame)

    # Break on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
