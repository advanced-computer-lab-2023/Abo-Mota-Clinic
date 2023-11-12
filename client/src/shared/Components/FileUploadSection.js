import { useUploadMedicalHistoryMutation } from "../../store";





function FileUploadSection({ files }) {
  const [uploadMedicalHistory] = useUploadMedicalHistoryMutation();

  const handleFileUpload = (event) => {
    const files = event.target.files;
    console.log(files);
    if (files.length > 0) {
        uploadMedicalHistory({medicalHistory:files[0]});
    }
  };
  
  const handleViewFile = (file) => {
    const arrayBuffer = new Uint8Array(file.data.data).buffer;
    const blob = new Blob([arrayBuffer], {type: file.contentType});
    const fileUrl = URL.createObjectURL(blob);
    window.open(fileUrl, '_blank');
  };
  

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Medical History :</h3>
      <div className="space-y-3">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">{file.fileName}, {/*{file.size}*/}</span>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:underline" onClick={() => handleViewFile(file)}>View</button>
              <button className="text-blue-600 hover:underline">Download</button>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white p-2 rounded-md">
            Upload Files
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} multiple />
        </div>
      </div>
    </div>
  );
}

export default FileUploadSection;
