function convertToAMPMFormat(inputDate) {
  // Parse input date string
  const inputDateObject = new Date(inputDate);

  // Check if the input date is valid
  if (isNaN(inputDateObject.getTime())) {
      return "Invalid Date";
  }

  // Extract hours and minutes
  let hours = inputDateObject.getHours();
  const minutes = inputDateObject.getMinutes();
  
  // Determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours || 12; // "0" should be displayed as "12"

  // Format the date to "HH:MM AM/PM"
  const AMPMFormat = `${hours}:${String(minutes).padStart(2, '0')} ${ampm}`;

  return AMPMFormat;
}

// Example usage:
const inputDate = "2023-12-16T03:56:42.611+00:00";
const AMPMFormat = convertToAMPMFormat(inputDate);
console.log(AMPMFormat);


export default convertToAMPMFormat;