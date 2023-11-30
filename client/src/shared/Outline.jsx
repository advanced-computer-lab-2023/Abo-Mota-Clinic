import { useState } from "react";
import NavBar from './Components/NavBar';
import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";

function Outline({ items, navBarItems = [] , socket}) {
  const [sideBarOpen, setSideBarOpen] = useState(false);
    
    return (
      <div className="flex flex-col "> {/* Full viewport height flex container */}
        <NavBar
          items={navBarItems}
          setSideBarOpen={setSideBarOpen}
          sideBarOpen={sideBarOpen} // Ensures the navbar is above the sidebar in z-index
          socket={socket}
        />

        <div className="flex mt-16 "> 
          <div className=" sticky  top-16 h-screen "> 
            <SideBar links={items} open={sideBarOpen} />
          </div>
          
          <Outlet/>
          </div>
        
      </div>
    );  
}

export default Outline;
