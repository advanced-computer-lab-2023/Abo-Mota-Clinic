import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaChartPie, FaChartLine, FaBook, FaCalendar } from "react-icons/fa"; // Import icons
import image from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SideBar({ open, links }) {
  // Inline styles for menu items

  const hoverStyles = {
    backgroundColor: "#ff0000", // Change this to the desired hover color
  };
  return (
    <Sidebar
      collapsedWidth="0px"
      collapsed={!open}
      backgroundColor="var(--primary-color-very-dark)"
    >
      <div style={{ padding: "1rem", display: "flex", alignItems: "center"}}>
        <h2 className=" text-[var(--text-color-primary)] font-semibold">Abo Mota Clinic</h2>
      </div>
      <Menu
        closeOnClick={true}
        className="h-screen text-white "
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0)
              return {
                color: disabled ? "#f5d9ff" : "#FFFFFF",
                backgroundColor: active ? "#232232" : undefined,
                ":hover": {
                  backgroundColor: "#add8e6",
                  color: "#000000",
                },
              };
          },
        }}
      >
        {links.map((link, index) => {
          return (
            <Link key={index} to={link.to}>
              <MenuItem icon={link.logo}>{link.name}</MenuItem>
            </Link>
          );
        })}
      </Menu>
    </Sidebar>
  );
}
