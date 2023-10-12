import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


export default function DatePickerMaterialUI({value, onChange}) {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="pick a date to filter" value={value} onChange={onChange} />
        
            {/* <DateRangePicker label="pick a date to filter" value={value} onChange={onChange} /> */}
      </LocalizationProvider>
    </div>
  );
}