import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose';
import Button from '../../../shared/Components/Button';

function ViewFilesSection({ medicalLicense, medicalDegree }) {

  
  const handleViewFile = (file) => {
    console.log(file);  
    const arrayBuffer = new Uint8Array(file.data.data).buffer;
    const blob = new Blob([arrayBuffer], {type: file.contentType});
    const fileUrl = URL.createObjectURL(blob);
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Credentials:</h3>
      <div className="space-y-3">
        <div  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Medical License {/*{file.size}*/}</span>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:underline" onClick={() => handleViewFile(medicalLicense)}>View</button>
            </div>
          </div>
          <div  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Medical Degree {/*{file.size}*/}</span>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:underline" onClick={() => handleViewFile(medicalDegree)}>View</button>
            </div>
          </div>
       </div> 
    </div>
  );
}

export default ViewFilesSection;