import React from "react";
import Card from "../util/Card";
import { CiTimer } from "react-icons/ci";
import { IoLayersOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FaTemperatureHigh } from "react-icons/fa";

import { FaFile } from "react-icons/fa";
import { useState } from "react";
import {useCurrentPrinterStateQuery, useCurrentJobStateQuery} from '../services/PrinterStatusAPI'

const Home = () => {
  const {data:printerData,isfetching:printerFetching} = useCurrentPrinterStateQuery()
  const {data:jobData, isfetching:jobFetching} = useCurrentJobStateQuery()

  // console.log(printerData)
  // console.log(jobData)
  const [pageOne, setPageOne] = useState(false);
  const [pageTwo, setPageTwo] = useState(true);

  const pageSwitchHandler = () => {
    setPageOne(!pageOne);
    setPageTwo(!pageTwo);
  };

  return (
    <>
      {pageOne && (
        <div class="grid grid-cols-2 gap-4">
          <Card className="text-white flex justify-between p-8">
            <div className="flex items-center gap-2">
              <CiTimer size={50} />
              <h1 className="text-xl">Estimated Completion Time</h1>
            </div>

            <h1 className="text-[40px] font-bold">23:30</h1>
          </Card>
          <Card className="text-white flex justify-between p-8">
            <div className="flex items-center gap-2">
              <IoLayersOutline size={50} />
              <h1 className="text-3xl">Layer</h1>
            </div>

            <h1 className="text-[40px] font-bold">200/999</h1>
          </Card>
          <Card className="text-white flex justify-between p-8">
            <div className="flex items-center gap-2">
              <HiOutlineStatusOnline size={50} />
              <h1 className="text-3xl">Status</h1>
            </div>

            <h1 className="text-[32px] font-bold">Connected</h1>
          </Card>
          <Card className="text-white flex justify-center p-8">
            <div className="flex items-center gap-2">
              <FaFile size={50} />
              <h1 className="text-xl">currentprint_name.gcode </h1>
            </div>
          </Card>

          <Card className="text-white flex justify-between p-8">
            <div className="flex items-center gap-2">
              <FaTemperatureHigh size={50} />
              <h1 className="text-xl">Build Plate Temperatures</h1>
            </div>

            <h1 className="text-[40px] font-bold">110*C</h1>
          </Card>
          <Card className="text-white flex justify-between p-8">
            <div className="flex items-center gap-2">
              <FaTemperatureHigh size={50} />
              <h1 className="text-xl">Build Plate Temperature</h1>
            </div>

            <h1 className="text-[40px] font-bold">110*C</h1>
          </Card>
        </div>
      )}
      {pageTwo && (
        <div class="grid grid-cols-2 gap-4">
          <Card className="text-white flex justify-between p-8">
            <div className="flex items-center gap-2">
              <CiTimer size={50} />
              <h1 className="text-xl">Estimated Completion Time</h1>
            </div>

            <h1 className="text-[40px] font-bold">23:30</h1>
          </Card>
          <Card className="text-white flex justify-between p-8">
            <div className="flex items-center gap-2">
              <IoLayersOutline size={50} />
              <h1 className="text-3xl">Layer</h1>
            </div>

            <h1 className="text-[40px] font-bold">200/999</h1>
          </Card>
        </div>
      )}
      <button
        type="button"
        onClick={pageSwitchHandler}
        class="fixed bottom-8 right-[540px] text-white w-32 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Next
        <svg
          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </>
  );
};

export default Home;
