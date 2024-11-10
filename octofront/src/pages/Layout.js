import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PrinterTitle from "../components/PrinterTitle";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className=" p-10 h-screen w-screen bg-customBlack overflow-hidden">
      <nav className="mb-4"><Navbar/></nav>
      <section className="flex gap-3">
        <aside>
          <Sidebar/>
        </aside>
        <main className=" flex flex-col w-full">
          <PrinterTitle/>
         <Outlet />
        </main>
      </section>
    </div>
  );
};

export default Layout;
