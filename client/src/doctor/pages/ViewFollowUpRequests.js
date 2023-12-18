import React from "react";
import { useState } from "react";
import { useNavigate, Link, Link as RouterLink } from "react-router-dom";
import "@fontsource/inter";
import "react-dropdown/style.css";
import DatePickerMaterialUI from "../components/DatePickerMaterialUI";
import dayjs from "dayjs";
import { useGetFollowUpsQuery } from "../../store";
import SearchBar from "../../patient/components/SearchBar";
import { isAfter, isSameDay, isBefore, set, parseISO } from "date-fns";
import { DatePicker, Space } from "antd";
import FollowUpRequestsCard from "../components/FollowUpRequestsCard";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Typography } from "@mui/joy";

const { RangePicker } = DatePicker;

function ViewFollowUpRequests() {
  const [selection, setSelection] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  //   const { data, error, isFetching } = useFetchAppointmentsQuery();
  const { data, error, isFetching } = useGetFollowUpsQuery();
  // const data = [
  //   {
  //     date: new Date("2023-12-10T09:00:00"),
  //     oldDate: new Date("2023-12-05T09:00:00"),
  //     patient: {
  //       name: "John Doe",
  //       email: "johndoe@example.com",
  //       mobile: "123-456-7890",
  //     },
  //   },
  //   {
  //     date: new Date("2023-12-11T11:00:00"),
  //     oldDate: new Date("2023-12-06T11:00:00"),
  //     patient: {
  //       name: "Jane Smith",
  //       email: "janesmith@example.com",
  //       mobile: "098-765-4321",
  //     },
  //   },
  //   {
  //     date: new Date("2023-12-12T14:00:00"),
  //     oldDate: new Date("2023-12-07T14:00:00"),
  //     patient: {
  //       name: "Alice Johnson",
  //       email: "alicejohnson@example.com",
  //       mobile: "456-789-0123",
  //     },
  //   },
  // ];
  let filteredFollowUpRequests = [];

  if (isFetching) {
    filteredFollowUpRequests = [];
    return <LoadingIndicator />;
  } else if (selection.length === 0) {
    filteredFollowUpRequests = data.filter((appointment) => appointment.patient != null);
  } else {
    filteredFollowUpRequests = data.filter((appointment) => selection.includes(appointment.status));
  }

  if (selectedDateRange) {
    filteredFollowUpRequests = filteredFollowUpRequests.filter((followUp) => {
      const followUpDate = new Date(followUp.formattedDate.split(",")[0]);
      const startDate = new Date(selectedDateRange[0]);
      const endDate = new Date(selectedDateRange[1]);

      const same = isSameDay(startDate, followUpDate) || isSameDay(endDate, followUpDate);
      const inRange = isAfter(followUpDate, startDate) && isBefore(followUpDate, endDate);

      return same || inRange;
    });
  }

  filteredFollowUpRequests = filteredFollowUpRequests.filter((followUp) => {
    const name = followUp.patient.name.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const handleDateRange = (date) => {
    setSelectedDateRange(date);
  };

  let renderedFollowUpRequests = [];

  if (filteredFollowUpRequests) {
    renderedFollowUpRequests = filteredFollowUpRequests.map((followUp, index) => {
      return <FollowUpRequestsCard key={index} followUpRequest={followUp} />;
    });
  }
  // console.log(filteredFollowUpRequests);
  return (
    <div className="mx-auto w-full mr-2">
      {!isFetching && (
        <div className="ml-20 flex flex-col space-y-4 mr-20">
          <Breadcrumbs aria-label="breadcrumbs" className="mb-2 mt-5">
            <Link component={RouterLink} color="neutral" to="../">
              Home
            </Link>
            <Typography>Requests</Typography>
          </Breadcrumbs>
          <div className="flex justify-between items-center space-x-4 w-full mt-10">
            <RangePicker onChange={handleDateRange} format={"MM/DD/YYYY"} />

            <SearchBar
              placeholder="Search for Requests..."
              onChange={(value) => setSearchTerm(value)}
            />
          </div>

          {renderedFollowUpRequests}
        </div>
      )}
    </div>
  );
}

export default ViewFollowUpRequests;
