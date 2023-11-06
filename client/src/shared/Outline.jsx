import React from "react";
import Navbar from "./Components/NavBar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Outline({ items, navBarItems }) {
  return (
    <>
      <div>
        <Navbar items={navBarItems} />
        <div style={{ display: "flex", width: "100vw" }}>
          <Sidebar items={items} />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Outline;
