import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const PrinterData = () => {
  const [bedTemperatureActual, setBedTemperatureActual] = useState(null);
  const [tool0TemperatureActual, setTool0TemperatureActual] = useState(null);
  const [estimatedPrintTime, setEstimatedPrintTime] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [state, setState] = useState(null);
  const [completion, setCompletion] = useState(null);

  useEffect(() => {
    // Connect to the OctoPrint WebSocket server
    const socket = io('ws://localhost:5000/api/socket');  // Replace with your OctoPrint WebSocket URL

    // Listen for updates from the server
    socket.on('printer_state', (data) => {
      console.log(data);  // Log the data to see the structure

      // Update the state with real-time data
      setBedTemperatureActual(data.bedTemperatureActual);
      setTool0TemperatureActual(data.tool0TemperatureActual);
      setEstimatedPrintTime(data.estimatedPrintTime);
      setFileName(data.fileName);
      setState(data.state);
      setCompletion(data.completion);
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="printer-data">
      <p>Bed Temperature: {bedTemperatureActual}</p>
      <p>Tool Temperature: {tool0TemperatureActual}</p>
      <p>Estimated Print Time: {estimatedPrintTime}</p>
      <p>File Name: {fileName}</p>
      <p>State: {state}</p>
      <p>Completion: {completion}</p>
    </div>
  );
};

export default PrinterData;
