import React from "react";
import Outline from "../shared/Outline";
import  items  from "./sidebarItems";
import { navBarItems } from "./navBarItems";

function Patient({socket}) {
  return <Outline items={items} navBarItems={navBarItems} socket={socket}/>;
}

export default Patient;
