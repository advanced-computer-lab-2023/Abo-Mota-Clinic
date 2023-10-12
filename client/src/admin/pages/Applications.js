import React, {useState} from "react";
import CollapsibleTable from "../components/CollapsibleTable";
import { useFetchApplicationsQuery } from "../../store";
function Applications() {
	const {data,error, isFetching}= useFetchApplicationsQuery();
	console.log(data);
	return (
		<div style={{width: "100%"}}>
			{!isFetching && <CollapsibleTable data={data}/>}
		</div>
	)
}

export default Applications;
