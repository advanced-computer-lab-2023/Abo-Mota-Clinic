import React from "react";
import Outline from "../shared/Outline";
import { items } from "./sidebarItems";
import { navBarItems } from "./navBarItems";

function Patient() {
  return <Outline items={items} navBarItems={navBarItems} />;
}

export default Patient;
