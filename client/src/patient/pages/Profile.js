import {useState} from 'react'
import Button from '../../shared/Components/Button';
import PersonalInfoSection from '../components/PersonalInfoSection';
import EmergencyContactCard from '../components/EmergencyContactCard';
import FileUploadSection from '../../shared/Components/FileUploadSection';
function Profile() {
  const patient = {
    name: 'Jane Moore',
    username: 'jmoore87',
    email: 'jane.moore@hello.com',
    dob: new Date('1987-03-10').toLocaleDateString('en-US'),
    gender: 'Female',
    mobile: '07123 456789',
    nationalId: 'AB123456C',
    emergencyContact: {
      name: 'Dan Stevens',
      mobile: '08123 456780',
      relation: 'Husband'
    },
  };

  const files = [
    { name: 'Ovarian Scan, 25 Nov', size: '2.7 MB', type: 'IMG' },
    { name: 'XYV Blood Tests', size: '0.7 MB', type: 'PDF' },
    { name: 'Blood Tests XYZ', size: '0.7 MB', type: 'PDF' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8 w-full">
      
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-5">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Patient Profile</h2>
        </div>
        <PersonalInfoSection patient={patient} />

        
        <div className="flex flex-wrap -mx-3 md:mx-6">
      
          <div className="w-full md:w-1/2 px-3 md:px-6 py-4">
            <EmergencyContactCard patient={patient} />
          </div>

          <div className="w-full md:w-1/2 px-3 md:px-6 py-4">
            <FileUploadSection files={files} />
          </div>
        </div>
        
      </div>
    </div>
  
  );
}

export default Profile;
