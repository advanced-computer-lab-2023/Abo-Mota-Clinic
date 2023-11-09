import Picture from '../assets/images/female_avatar.png'

function  PersonalInfoSection({patient})
{
    return ( 
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="flex flex-col items-center">
        {/* Use a label to wrap the image to act as the file upload trigger */}
        <label htmlFor="profile-photo-upload" className="relative cursor-pointer">
          <div className="flex-shrink-0 h-20 w-20">
            <img
              className="h-20 w-20 rounded-full hover:opacity-80"
              src={Picture}
              alt="patient"
            />
            
            <span className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100">
              <span className="text-sm text-white bg-black bg-opacity-75 rounded-full p-1">
                Upload
              </span>
            </span>
          </div>
        </label>
        <input id="profile-photo-upload" type="file" className="hidden" />

        <div className="flex-1 min-w-0 text-center">
          <p className="text-lg font-medium text-gray-900">{patient.name}</p>
          <p className="text-sm text-gray-500 truncate">{patient.email}</p>
        </div>
      </div>
            <div className="col-span-1 md:col-span-2">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Username</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.username}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.dob}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.gender}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.mobile}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">National ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.nationalId}</dd>
                </div> 
              </dl>
            </div>
          </div>
    );
}

export default PersonalInfoSection;

    
