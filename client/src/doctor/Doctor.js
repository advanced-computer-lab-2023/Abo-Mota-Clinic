import React, { useEffect } from "react";
import Outline from "../shared/Outline";
import { items } from "./sidebarItems";
import { useFetchDoctorQuery } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../store/index";
import { navBarItems } from "./navBarItems";

function Doctor() {
  const { data, error, isFetching } = useFetchDoctorQuery();
  // console.log(data);
  // const dispatch = useDispatch();

  // useEffect(() => {
  // 	dispatch(getDoctors(data));
  // }, []);

  return (
    <div>
      {isFetching && <div>Loading...</div>}
      {!isFetching && <Outline items={items} navBarItems={navBarItems}/>}
    </div>
  );
}

export default Doctor;
