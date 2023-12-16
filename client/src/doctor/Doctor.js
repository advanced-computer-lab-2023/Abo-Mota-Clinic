import React, { useEffect } from "react";
import Outline from "../shared/Outline";
import  items  from "./sidebarItems";
import { useFetchDoctorQuery } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../store/index";
import  {navBarItems}  from "./navBarItems";

function Doctor({socket}) {
  const { data, error, isFetching } = useFetchDoctorQuery();
  console.log(data);
  // const dispatch = useDispatch();

  // useEffect(() s=> {
  // 	dispatch(getDoctors(data));
  // }, []);


  useEffect(() => {
    !isFetching && socket.emit("user_connected", data._id)
  }, [isFetching]);

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {!isFetching &&
        <Outline items={items} navBarItems={navBarItems} socket={socket}/>}
    </>
  );
}

export default Doctor;