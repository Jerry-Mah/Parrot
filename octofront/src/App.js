import React from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CameraFeed from "./pages/CameraFeed";
import PrinterControl from "./pages/PrinterControl";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
const App = () => {
  const count = 3; 
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="controls" element={<PrinterControl />} />
          <Route path="camerafeed" element={<CameraFeed />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
