import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const MyDatePicker = ({ handleDateCompare }) => {

  const dateStr = '10/15/2023, 10:00 AM';
  const customFormat = 'MM/DD/YYYY, HH:mm A';
  
  console.log(dayjs(dateStr, { format: customFormat }).format());
  
  const inputDate = '10/15/2023 03:00 PM';
  
  const parsedDate = dayjs(dateStr, { format: customFormat });
  const parsedInputDate = dayjs(inputDate, { format: customFormat });
  
  let str;

  if (parsedInputDate.isAfter(parsedDate)) {
    str = 'after';
  }
  else if (parsedInputDate.isBefore(parsedDate))
    str = 'before';
  else
    str = 'same';


console.log(parsedDate.format());
const [selectedDate, setSelectedDate] = useState(null);

const handleDateChange = (date, dateString) => {
  setSelectedDate(date);
};

const compareDates = () => {
  if (selectedDate) {
    // Convert the selected date to a Day.js object
    const selectedDateDayjs = dayjs(selectedDate);

    // Pass the Day.js date object to the parent component for comparison
    handleDateCompare(selectedDateDayjs);
  } else {
    console.log('Please select a date.');
  }
};

return (
  <div>
    <DatePicker
      format="MM-DD-YYYY HH:mm A"
      showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
      onChange={(date, dateString) => console.log(dayjs(date))}
    />

    { str }

    <Button type="primary" onClick={compareDates}>
      Compare Date
    </Button>
  </div>
);
};

export default MyDatePicker;


