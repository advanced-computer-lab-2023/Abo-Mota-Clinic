  import PersonalInfoSection from '../components/PersonalInfoSection';
  import EmergencyContactCard from '../components/EmergencyContactCard';
  import FileUploadSection from '../../shared/pages/FileUploadSection';
  import { useFetchPatientQuery } from '../../store';
  import ChangePasswordSection from '../../shared/pages/ChangePasswordSection';

  function Profile() {
    

    const {data, error, isFetching} = useFetchPatientQuery();
    
    //
    return (
      <div className="bg-gray-100 p-8 w-full space-y-8">
        {isFetching ||
          <>
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-5">
              <div className="p-5 border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Patient Profile</h2>
              </div>
              <PersonalInfoSection patient={data} />
              <div className="flex flex-wrap -mx-3 md:mx-6">
                <div className="w-full md:w-1/2 px-3 md:px-6 py-4">
                <ChangePasswordSection isAdmin />
                  <EmergencyContactCard patient={data} />
                </div>
                <div className="w-full md:w-1/2 px-3 md:px-6 py-4">
                  <FileUploadSection files={data.medicalHistory} medicalHistory />
                  <FileUploadSection files={data.healthRecords} />
                </div>
              </div>
            </div>
          </>}
      </div>

    );
  }

  export default Profile;
