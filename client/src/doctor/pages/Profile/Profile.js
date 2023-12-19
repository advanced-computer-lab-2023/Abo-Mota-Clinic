import PersonalInfoSection from './PersonalInfoSection';
import ViewFileSection from './ViewFileSection';
import { useFetchDoctorQuery } from '../../../store'; 
import ChangePasswordSection from '../../../shared/pages/ChangePasswordSection';

function Profile() {
 

  const {data, error, isFetching} = useFetchDoctorQuery();
  if(!isFetching)
  console.log(data);
  return (
    <div className="bg-gray-100 p-8 w-full space-y-8">
      {isFetching ||
        <>
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-5">
            <div className="p-5 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Doctor Profile</h2>
            </div>
            <PersonalInfoSection doctor={data} />
            <div className="flex flex-wrap -mx-3 md:mx-6">
              <div className="w-full md:w-1/2 px-3 md:px-6 py-4">
              <ChangePasswordSection isDoctor/>
              </div>
              <div className="w-full md:w-1/2 px-3 md:px-6 py-4">
                <ViewFileSection medicalLicense={data.medicalLicense} medicalDegree={data.medicalDegree}/>
              </div>
            </div>
          </div>
        </>}
    </div>

  );
}

export default Profile;
