import { useFetchApplicationsQuery } from "../../store";
import ApplicationCard from "../components/ApplicationCards";
function Applications() {
	const {data, error, isFetching}= useFetchApplicationsQuery();
	
	const renderedData = data.map((data, index) => {
		return <div key={index}>
			{!isFetching && <ApplicationCard data={data}/>}
		</div>
	})
	return (
		<div>
			{renderedData}
		</div>
	)
}

export default Applications;
