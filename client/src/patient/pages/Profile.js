import {useState} from 'react'
import Button from '../../shared/Components/Button';
import PersonalInfoSection from '../components/PersonalInfoSection';
import EmergencyContactCard from '../components/EmergencyContactCard';
import FileUploadSection from '../../shared/Components/FileUploadSection';
import { useFetchPatientQuery } from '../../store';

function Profile() {

  const files = [
    { name: 'Ovarian Scan, 25 Nov', size: '2.7 MB', type: 'IMG' },
    { name: 'XYV Blood Tests', size: '0.7 MB', type: 'PDF' },
    { name: 'Blood Tests XYZ', size: '0.7 MB', type: 'PDF' },
  ];

  const {data, error, isLoading} = useFetchPatientQuery();

  return (
    <div className="bg-gray-100 min-h-screen p-8 w-full">
      {isLoading ||
      <>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-5">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Patient Profile</h2>
        </div>
        <PersonalInfoSection patient={data} />
        <div className="flex flex-wrap -mx-3 md:mx-6">
          <div className="w-full md:w-1/2 px-3 md:px-6 py-4">
            <EmergencyContactCard patient={data} />
          </div>
          <div className="w-full md:w-1/2 px-3 md:px-6 py-4">
            <FileUploadSection files={files} />
          </div>
        </div>
        
      </div>
      </> }
      
    </div>
  
  );
}

export default Profile;
