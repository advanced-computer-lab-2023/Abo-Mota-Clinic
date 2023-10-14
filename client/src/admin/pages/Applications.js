import { useFetchApplicationsQuery } from "../../store";
import ApplicationCard from "../components/ApplicationCards";
function Applications() {
  const { data, error, isFetching } = useFetchApplicationsQuery();
  let renderedData = null;
  if (!isFetching) {
    renderedData = data.map((data, index) => {
      return <div key={index}>{!isFetching && <ApplicationCard data={data} />}</div>;
    });
  } else {
    renderedData = <div>Loading.....</div>;
  }

  return <div className="flex flex-wrap">{renderedData}</div>;
}

export default Applications;
