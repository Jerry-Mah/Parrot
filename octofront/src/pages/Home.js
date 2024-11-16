import React from "react";
import Card from "../util/Card";
import { CiTimer } from "react-icons/ci";
import { IoLayersOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FaTemperatureHigh } from "react-icons/fa";

import { FaFile } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  useCurrentPrinterStateQuery,
  useCurrentJobStateQuery,
} from "../services/PrinterStatusAPI";

import { useDispatch } from "react-redux";
import { setReady } from "../services/PrinterSlice";

const Home = () => {
  const { data: printerData, isFetching: printerFetching } = useCurrentPrinterStateQuery(undefined, {
    pollingInterval: 3000, // Poll every 5 seconds
  });
  
  const { data: jobData, isFetching: jobFetching } = useCurrentJobStateQuery(undefined, {
    pollingInterval: 3000, // Poll every 5 seconds
  });

  const [bedTemperatureActual, setBedTemperatureActual] = useState(null);
  const [tool0TemperatureActual, setTool0TemperatureActual] = useState(null);
  const [estimatedPrintTime, setEstimatedPrintTime] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [state, setState] = useState(null);
  const [completion, setCompletion] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!printerFetching && printerData) {
      const ready = printerData.state.flags.ready;
      dispatch(setReady(ready)); // Dispatch ready to Redux store
    }
  }, [printerFetching, printerData, dispatch]);


  const formatTime = (seconds) => {
    if (!seconds) return "N/A";
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const convertToPercentage = (decimalValue) => {
    return (decimalValue * 100).toFixed(2) + '%';
  };
  

  useEffect(() => {
    // Set initial values when component mounts
    setBedTemperatureActual(printerData?.temperature?.bed?.actual || "N/A");
    setTool0TemperatureActual(printerData?.temperature?.tool0?.actual || "N/A");
    
    setEstimatedPrintTime(jobData?.progress?.printTimeLeft);
    setFileName(jobData?.job?.file?.name || "N/A");
    setState(jobData?.state || "N/A");
    setCompletion(convertToPercentage(jobData?.progress?.completion))

    // Cleanup function to reset values on unmount
    return () => {
      setBedTemperatureActual(null);
      setTool0TemperatureActual(null);
      setEstimatedPrintTime(null);
      setFileName(null);
      setState(null);
    };
  }, [printerData, jobData]);

 

  return (
    <>
      <div class="grid grid-cols-2 gap-4">
        <Card className="text-white flex justify-between p-8">
          <div className="flex items-center gap-2">
            <CiTimer size={50} />
            <h1 className="text-xl">Estimated Completion Time</h1>
          </div>

          <h1 className="text-[40px] font-bold">
            {estimatedPrintTime == null ? "0" : formatTime(estimatedPrintTime)}
          </h1>
        </Card>
        <Card className="text-white flex justify-between p-8">
          <div className="flex items-center gap-2">
            <IoLayersOutline size={50} />
            <h1 className="text-3xl">Percentage</h1>
          </div>

          <h1 className="text-[40px] font-bold">{completion}</h1>
        </Card>
        <Card className="text-white flex justify-between p-8">
          <div className="flex items-center gap-2">
            <HiOutlineStatusOnline size={50} />
            <h1 className="text-3xl">State:</h1>
          </div>

          <h1 className="text-[32px] font-bold">{state}</h1>
        </Card>
        <Card className="text-white flex justify-center p-8">
          <div className="flex items-center gap-2">
            <FaFile size={50} />
            <h1 className="text-xl">{fileName}</h1>
          </div>
        </Card>

        <Card className="text-white flex justify-between p-8">
          <div className="flex items-center gap-2">
            <FaTemperatureHigh size={50} />
            <h1 className="text-xl">Build Plate Temperatures</h1>
          </div>

          <h1 className="text-[40px] font-bold">{bedTemperatureActual}℃</h1>
        </Card>
        <Card className="text-white flex justify-between p-8">
          <div className="flex items-center gap-2">
            <FaTemperatureHigh size={50} />
            <h1 className="text-xl">Tool Temperature</h1>
          </div>

          <h1 className="text-[40px] font-bold">{tool0TemperatureActual}℃</h1>
        </Card>
      </div>
    </>
  );
};

export default Home;
