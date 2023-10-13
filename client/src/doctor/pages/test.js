import { useState } from "react";
import DatePickerMaterialUI from "../components/DatePickerMaterialUI";

function Test() {
    const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);

    const handleDateChange = (date) => {
		setSelectedDate(date);
	};

    return (
        <DatePickerMaterialUI value={selectedDate} onChange={handleDateChange} />

    );
}