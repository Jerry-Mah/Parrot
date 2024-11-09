import cv2
import time
import socketio
import logging
from roboflow import Roboflow
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Roboflow setup
def setup_roboflow():
    rf = Roboflow(api_key="SrpFJK8EZKO4eKywSP4m")
    project = rf.workspace("stringing-fault-detection").project("stringing-faults")
    model = project.version(4).model
    return model

# Initialize Roboflow model
roboflow_model = setup_roboflow()

# Initialize Socket.IO client
sio = socketio.Client(logger=True, engineio_logger=True)

# Connect to Socket.IO server
try:
    sio.connect('http://localhost:5001')
    logger.info("Connected to Socket.IO server")
except Exception as e:
    logger.error(f"Failed to connect to server: {e}")

# Set up video capture (0 for webcam, or replace with video file path)
cap = cv2.VideoCapture(0)

# Initialize last prompt time to 0
last_prompt_time = 0
prompt_interval = 10 * 60  # 10 minutes in seconds

def save_frame(frame):
    # Save frame to a temporary file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    temp_filename = f"temp_frame_{timestamp}.jpg"
    cv2.imwrite(temp_filename, frame)
    return temp_filename

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Save frame and perform Roboflow prediction
    temp_filename = save_frame(frame)
    try:
        prediction = roboflow_model.predict(temp_filename, confidence=40, overlap=30).json()
        
        # Check if any detections of interest are present
        found_fault = any(detection['class'] == 'stringing' for detection in prediction['predictions'])

    except Exception as e:
        logger.error(f"Prediction error: {e}")
        continue

    # Get current time
    current_time = time.time()

    # If a stringing fault is detected and 10 minutes have passed since the last prompt, ask the user
    if found_fault and (current_time - last_prompt_time >= prompt_interval):
        print("Found")

        # Ask user if they want to stop
        user_input = input("Stringing fault detected. Do you want to stop the process? (yes/no): ").strip().lower()
        
        if user_input == "yes":
            print("Stopping process...")
            # Emit fault detected event
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

    # Display the frame
    cv2.imshow("Detection Feed", frame)



# Release resources
cap.release()
cv2.destroyAllWindows()
