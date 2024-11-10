import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import "dotenv/config";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Port info
// const serialPortName = '/dev/ttyUSB0';
// const serialport = new SerialPort({ path: serialPortName, baudRate: 9600 });

// Configuration
const OCTOPRINT_CONFIG = {
  url: process.env.VITE_API_URL_OCTOPRINT,
  apiKey: process.env.VITE_API_KEY_OCTOPRINT,
};

// Printer state management (future use)
let printerState = {
  isPrinting: false,
  faultDetected: false,
  currentJob: null,
};

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle ML model fault detection
  socket.on("fault_detected", async (data) => {
    console.log("Fault detected:", data);
    printerState.faultDetected = true;

    try {
      // Stop the print
      await cancelPrint();
      console.log("Print stopped successfully");

      // Command robot to clear bed
      console.log("bed clearing started");
      clearPrintBed();
    } catch (error) {
      console.error("Error handling fault:", error);
    }
  });

  // Handle print completion
  socket.on("print_complete", async () => {
    console.log("Print complete");
    try {
      clearPrintBed();
    } catch (error) {
      console.error("Error handling print completion:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// OctoPrint API functions
async function cancelPrint() {
  try {
    const response = await fetch(`${OCTOPRINT_CONFIG.url}/api/job`, {
      method: "POST",
      headers: {
        "X-Api-Key": OCTOPRINT_CONFIG.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: "cancel",
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error cancelling print:", error);
  }
}

// Robot control functions
async function clearPrintBed(status) {
  console.log("Clear plate command received");
  // serialport.write('1\n');
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
