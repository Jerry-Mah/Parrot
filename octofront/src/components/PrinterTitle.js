import React from 'react'
import { MdOnlinePrediction } from "react-icons/md";
import { useSelector } from "react-redux";



const PrinterTitle = () => {
  const ready = useSelector((state) => state.printer.ready);
  return (
    <div className='px-28 py-4 mb-12 flex justify-between rounded-full bg-black text-white border-4 border-customPurple text-lg'>
        <h3>Printer:01</h3>
        <h3 className='font-bold'>Ender 3 Pro</h3>
        <div className='flex items-center gap-2'>
        <MdOnlinePrediction/>
        <h3>{ready ? "Online" : "Not available"}</h3>
        </div>
        
    </div>
  )
}

export default PrinterTitle