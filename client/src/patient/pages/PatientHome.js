import { Box, Divider, Typography } from "@mui/joy";
import { useFetchPatientQuery } from "../../store";

function PatientHome() {

  const { data, isFetching, isError } = useFetchPatientQuery();
  let content;

  if (isFetching) {
    content = <div> Loading ... </div>;
  } else if (isError) {
    content = <div> Error ... </div>;
  } else {
    content = (
      <Box className="w-full">
        <Typography level="h4" fontWeight={400}>
          Welcome, {data.name}!
        </Typography>
        <Divider />
      </Box>
    );
  };

  return (
    <Box className="w-full mt-10 ml-20">
      {content}
    </Box>
  );
}

export default PatientHome;