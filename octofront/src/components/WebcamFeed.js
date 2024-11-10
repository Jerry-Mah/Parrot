import React, { useRef, useEffect, useState } from 'react';

const WebcamFeed = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream; // Store stream reference for cleanup
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Failed to access webcam. Please make sure you have granted camera permissions.");
      }
    };

    startWebcam();

    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => {
          track.stop();
          streamRef.current = null;
        });
      }
    };
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline
        className="w-full h-full md:w-3/4 lg:w-1/2 aspect-video rounded-lg shadow-lg"
      />
    </div>
  );
};

export default WebcamFeed;