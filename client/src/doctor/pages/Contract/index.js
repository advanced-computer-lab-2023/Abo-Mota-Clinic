import './style.css';
import { useFetchDoctorQuery, useAcceptContractMutation } from "../../../store";


const Contract = ({contractTitle, name, doctor}) => {
let today = new Date(); // Get today's date
let date = today.getDate(); // Get the day as a number (1-31)
let month = today.getMonth() + 1; // Get the month as a number (0-11), add 1 because January is 0
let year = today.getFullYear(); // Get the full year (e.g. 2023)

// Format the date as YYYY-MM-DD
let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;

const { data, isFetching, isError } = useFetchDoctorQuery();
const [acceptContract, result] = useAcceptContractMutation();
  console.log(data)
  let fetchedName = "";
  if(!isFetching){
    fetchedName = data.name;
  }

  
  const contractParagraph = `This Employment Agreement is entered into as of ${formattedDate}, by Dr.${fetchedName} and between Abo Mota Clinic , collectively referred to as the "Parties". The Parties hereby agree to the terms and conditions set forth herein whereby the Doctor shall provide medical services to the Employer's patients in a capacity that is both professional and diligent, consistent with the highest standards of the medical profession. This Agreement outlines the terms of employment, compensation, duties, and responsibilities as well as mutual commitments made between the Employer and the Doctor. The Doctor's commitment to deliver healthcare services shall be rewarded with a compensation package detailed below, which includes a base salary and a markup structure designed to incentivize exceptional care and service.`;
  return (
    <div className="Contract-Container">
      <div className="first-contract">
        <div className='contract-title'>{contractTitle}</div>
        <div className="employee-name">Dear Dr.{fetchedName},</div>
        <p className="contract-paragraph">{contractParagraph}</p>
        <div className='terms-title'>Terms of Employment:</div>
        <div className='terms-paragraph'>The Doctor shall be employed in the capacity of a full-time employee. The Doctor shall be expected to work a minimum of 40 hours per week. The Doctor shall be expected to work from sundays to thursdays from 9am to 4pm GMT+2.</div>
        <div className='terms-title'>Markup:</div>
        <div className='terms-paragraph'>The Clinic will take either 10% of the profit or 10000EGP.</div>
        {!(data.contractApproved) && (<div className='terms-paragraph-accept'>Pressing the Accept contract button means accepting all points in the contract</div>)}
        <div className="contract-signature">
          {!(data.contractApproved) &&
          <button className='contract-button' onClick={async() => {await acceptContract()}}>
            Accept Contract
          </button>}
        </div>
      </div>
      <div className="second-contract"></div>
    </div>
  );
};

export default Contract;