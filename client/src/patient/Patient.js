import React from "react";
import Outline from "../shared/Outline";
import  items  from "./sidebarItems";
import { navBarItems } from "./navBarItems";
import { useEffect } from "react";
import { useFetchPatientQuery } from "../store";


function Patient({socket}) {

const { data, error, isFetching } = useFetchPatientQuery();

  useEffect(() => {
    !isFetching && socket.emit("user_connected", data._id)
  }, [isFetching]);

  return <Outline items={items} navBarItems={navBarItems} socket={socket}/>;
}

export default Patient;
