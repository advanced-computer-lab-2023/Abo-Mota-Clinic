import './styles.css';
import {AiOutlineClose} from 'react-icons/ai';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from "../../../shared/Components/Button";
import LoadingIndicator from "../../../shared/Components/LoadingIndicator";
import { useState } from "react";
import FileInput from "../../../shared/Components/FileInput";

const AddHealthRecordScreen = ({closeForm}) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
    resetForm({ values: '' });
  };
  const OtpForm = (
    <Formik
    initialValues={initialUploadHealthRecords}
    validationSchema={uploadRecordSchema}
    onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-container">         
          <FileInput
            label="Record*"
            id="healthRecord"
            name="healthRecord" // Ensure this is set to correctly associate with Formik's `getFieldProps`
            error={formik.errors.healthRecord}
            touch={formik.touched.healthRecord}
            onChange={(file) => formik.setFieldValue('healthRecord', file)}
            onBlur={() => formik.setFieldTouched('healthRecord', true)} // To handle touch status
          />
          </div>
          <div className="submit-add-medicine-button-container">
          {isLoading ? <LoadingIndicator /> :
            // <Link to='medicine'>
              <Button type="submit">
                Submit
              </Button>
            // </Link>
          }
        </div>
        </form>
      )}

    </Formik>
    );
  return (
    <div className='add-health-record-portal-container'>
      <div className='add-health-record-portal'>
        <div className='add-health-record-button-container'>
          <h1 className='add-health-record-header'>Upload Record</h1>
          <span className= 'add-health-record-close-button-span' onClick={closeForm}><AiOutlineClose size={30} color='black'/></span>
        </div>
        {OtpForm}
      </div>
    </div>

  );
}
const FILE_SIZE = 10000 * 1024; 
const SUPPORTED_FORMATS = ['application/pdf'];

const uploadRecordSchema = yup.object().shape({
  healthRecord: yup
  .mixed()
  .required('A file is required')
  .test(
    'fileFormat',
    'Unsupported Format',
    (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && SUPPORTED_FORMATS.includes(file.type);
    }
  )
  .test(
    'fileSize',
    'File too large',
    (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && file.size <= FILE_SIZE;
    }
  )});


const initialUploadHealthRecords = {
  healthRecord: '',
};


export default AddHealthRecordScreen;