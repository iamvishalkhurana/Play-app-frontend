import React from "react";
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="sm:flex flex-none">
        <div className="border-b">
          <Sidebar />
        </div>
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
