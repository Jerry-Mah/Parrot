import React, { useState } from "react";
import Card from "../util/Card";
import { MdCancel } from "react-icons/md";
import Button from "../util/Button";
import { FaPause } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";
import { FaTemperatureLow } from "react-icons/fa";
import axios from "axios";
import { toast } from 'sonner';


const OCTOPRINT_URL = "http://localhost:5000";
const API_KEY = "4F4A25BB923147378E9E96D30E425D13";

const headers = {
  "X-Api-Key": API_KEY,
  "Content-Type": "application/json",
};

async function startPrint(filename) {
  try {
    const response = await fetch(
      `${OCTOPRINT_URL}/api/files/local/${filename}`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          command: "select",
          print: true,
        }),
      }
    );
    toast.success('Print Started!');
  } catch (error) {
    console.error("Error starting print:", error);
  }
}

async function cancelPrint() {
  try {
    const response = await fetch(`${OCTOPRINT_URL}/api/job`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        command: "cancel",
      }),
    });
    toast.success('Print Cancelled');
  } catch (error) {
    console.error("Error cancelling print:", error);
  }
}
async function pauseResumePrint(action) {
  try {
  
    const response = await fetch(`${OCTOPRINT_URL}/api/job`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        command: action, // "pause" or "resume"
      }),
    });

    // Check if the response is okay
    if (response.ok) {
      const data = await response.json();
      toast.success('Print Paused!');
      return data;
    } else {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(`Error: ${response.status} - ${errorData.error}`);
    }
  } catch (error) {
    console.error("Error with pause/resume:", error);
  }
}
async function setToolTemperature(temp) {
  try {
    const response = await fetch(`${OCTOPRINT_URL}/api/printer/tool`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        command: "target",
        targets: {
          tool0: temp,
        },
      }),
    });
  } catch (error) {
    console.error("Error setting temperature:", error);
  }
}
async function setBedTemperature(temp) {
  try {
      const response = await fetch(`${OCTOPRINT_URL}/api/printer/bed`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
              command: "target",
              target: temp
          })
      });
      return await response.json();
  } catch (error) {
      console.error('Error setting bed temperature:', error);
  }
}


const PrinterControl = () => {
  const [tempDetails, setTempDetails] = useState(false);
  const [bedTemp, setBedTemp] = useState("");
  const [toolTemp, setToolTemp] = useState("");

  const handleSubmit = async () => {
    // Log the current values
    console.log("Bed Temperature:", bedTemp);
    console.log("Tool Temperature:", toolTemp);
    
    await setToolTemperature(parseInt(toolTemp, 10)); 
    await setBedTemperature(parseInt(bedTemp,10));
    toast.success('Temperature has been set!');
    // Reset state values after async operation completes
    setBedTemp('');
    setToolTemp('');

    // Toggle the tempDetails visibility
    setTempDetails(prevState => !prevState); // Use functional form for toggling to ensure the most recent state is used
};
  return (
    <>
    {/* <Toast/> */}
      <div class="grid grid-cols-2 gap-4 center">
        <Button
          onClick={() => cancelPrint()}
          className="text-white flex justify-center items-center p-8 gap-2"
        >
          <h1 className="text-2xl font-bold">Cancel Print</h1>
          <MdCancel size={50} />
        </Button>
        <Button
          onClick={() => pauseResumePrint("pause")}
          className="text-white flex justify-center items-center p-8 gap-2"
        >
          <h1 className="text-2xl font-bold">Pause Print</h1>
          <FaPause size={50} />
        </Button>
        <Button
          onClick={() => startPrint("test.gcode")}
          className="text-white flex justify-center items-center p-8 gap-2"
        >
          <h1 className="text-2xl font-bold">Start Print</h1>
          <MdOutlineNotStarted size={50} />
        </Button>
        <Button
          onClick={() => {
            setTempDetails(!tempDetails);
          }}
          className="text-white flex justify-center items-center p-8 gap-2"
        >
          <h1 className="text-2xl font-bold">Set Temperature</h1>
          <FaTemperatureLow size={50} />
        </Button>
      </div>
      {tempDetails && (
        <Card className="w-full mt-3 text-black flex flex-col justify-center items-center p-8 text-3xl gap-4">
          <div className="flex gap-4">
            <div className="mb-4">
              <label
                htmlFor="bedTemp"
                className="block text-sm font-medium text-white"
              >
                Bed Temperature
              </label>
              <input
                type="number"
                id="bedTemp"
                value={bedTemp}
                onChange={(e) => {
                  setBedTemp(e.target.value);
                }}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter Bed Temperature"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="toolTemp"
                className="block text-sm font-medium text-white"
              >
                Tool Temperature
              </label>
              <input
                type="number"
                id="toolTemp"
                value={toolTemp}
                onChange={(e) => {
                  setToolTemp(e.target.value);
                }}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter Tool Temperature"
              />
            </div>
          </div>
          <button onClick={handleSubmit} className=" text-white w-32 bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
            Submit
          </button>
        </Card>
      )}
    </>
  );
};

export default PrinterControl;
