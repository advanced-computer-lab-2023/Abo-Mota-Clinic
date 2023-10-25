import React, { useEffect } from "react";
import Outline from "../shared/Outline";
import { items } from "./sidebarItems";
import { useFetchDoctorQuery } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../store/index";

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
      {!isFetching && <Outline items={items} />}
    </div>
  );
}

export default Doctor;
