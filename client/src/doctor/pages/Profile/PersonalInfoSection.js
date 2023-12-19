import Picture from '../../../patient/assets/images/female_avatar.png'
import Picture2 from '../../../patient/assets/images/male_avatar.png'
import { useState } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import {useUpdateDoctorMutation } from "../../../store";
import emailValidator from "email-validator";


function  PersonalInfoSection({doctor})
{
  
const [isEditingEmail, setIsEditingEmail] = useState(false);
const [editableEmail, setEditableEmail] = useState(doctor.email);
const [isEditingRate, setIsEditingRate] = useState(false);
const [editableRate, setEditableRate] = useState(doctor.rate);
const [isEditingAffiliation, setIsEditingAffiliation] = useState(false);
const [editableAffiliation, setEditableAffiliation] = useState(doctor.affiliation);
const [updateDoctor, results] = useUpdateDoctorMutation();


  const validateEmail = (email) => {
    return isEditingEmail && emailValidator.validate(email);
  };

const handleEditEmail = () => {
  setIsEditingEmail(true);
};

const handleSaveEmail = () => {
    //api call
  if(validateEmail(editableEmail))
  {
    updateDoctor({email:editableEmail, affiliation:doctor.affiliation, rate:doctor.rate});
    setIsEditingEmail(false);
  }
};

const handleCancelEditEmail = () => {
  
  setEditableEmail(doctor.email);
  setIsEditingEmail(false);
};
const handleEditRate= ()=>{
    setIsEditingRate(true);
}
const handleSaveRate=()=>{
    //api call
    if(editableRate==='')
        return;
    updateDoctor({email:doctor.email, affiliation:doctor.affiliation,rate: parseInt(editableRate)});
    setIsEditingRate(false);
}
const handleCancelEditRate=()=>{
    setIsEditingRate(false);
}

const handleEditAffiliation =()=>{
    setIsEditingAffiliation(true);
}

const handleSaveAffiliation = ()=>{
    
    if(editableAffiliation==='')
        return;
    updateDoctor({affiliation:editableAffiliation, email:doctor.email, rate:doctor.rate});
    setIsEditingAffiliation(false);
}

const handleCancelEditAffiliation = ()=>{
    setIsEditingEmail(false);
}



const formattedDate = new Date(doctor.dob).toLocaleDateString('en-GB', {
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric'
});


  let profilePicture = Picture
  if(doctor.gender==='male')
    profilePicture = Picture2;
    return ( 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="flex flex-col items-center">
        <label htmlFor="profile-photo-upload" className="relative cursor-pointer">
          <div className="flex-shrink-0 h-20 w-20">
            <img
              className="h-20 w-20 rounded-full hover:opacity-80"
              src={profilePicture}
              alt="doctor"
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
          <p className="text-lg font-medium text-gray-900">{doctor.name}</p>
          <p className="text-sm text-gray-500 truncate">{doctor.specialty}</p>
        </div>
      </div>
            <div className="col-span-1 md:col-span-2">
              <dl className="grid grid-cols-1 g ap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Username</dt>
                  <dd className="mt-1 text-sm text-gray-900">{doctor.username}</dd>
                </div>
                <EditableField key='Email' value={editableEmail} setValue={setEditableEmail}
                 editable={isEditingEmail} handleSave={handleSaveEmail}
                  handleCancel={handleCancelEditEmail} handleEdit={handleEditEmail}/>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formattedDate}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Educational Background</dt>
                  <dd className="mt-1 text-sm text-gray-900">{doctor.educationalBackground}</dd>
                </div>  
                <EditableField 
                key='Affiliation' 
                value={editableAffiliation} 
                setValue={setEditableAffiliation}
                editable={isEditingAffiliation} 
                handleSave={handleSaveAffiliation}
                handleCancel={handleCancelEditAffiliation}
                handleEdit={handleEditAffiliation}/>
                <EditableField 
                key='Hourly Rate' 
                value={editableRate} 
                setValue={setEditableRate}
                editable={isEditingRate} 
                handleSave={handleSaveRate}
                handleCancel={handleCancelEditRate}
                handleEdit={handleEditRate}/> 
              </dl>
            </div>
          </div>
    );
}

function EditableField({key, value, setValue,editable, handleSave, handleEdit, handleCancel}){
    
    return(<div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{key}</dt>
            <dd className="mt-1 text-sm text-gray-900 flex items-center">
            {editable ? (
            <input type="text" value={value} onChange={e => setValue(e.target.value)}  className="w-1/2 mr-2 text-sm" />
            ) : (
            <>{value}</>
            )}
            <button className="ml-2" onClick={editable ? handleSave : handleEdit}>
            {editable ? <IoCheckmarkOutline /> : <FaPencilAlt />}
            </button>
            {editable && (
            <button className="ml-2"onClick={handleCancel}>
            <FcCancel />
            </button>
             )}
            </dd>
        </div>
    )
}
export default PersonalInfoSection;

    
