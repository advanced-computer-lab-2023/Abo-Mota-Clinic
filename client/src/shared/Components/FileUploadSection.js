

function FileUploadSection({files})
{
    return (
    <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Latest Lab Results:</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{file.name}, {file.size}</span>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-blue-600 hover:underline">Download</button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white p-2 rounded-md">
                Upload Files
              </label>
              <input id="file-upload" type="file" className="hidden"  multiple />
            </div>
        </div>
    </div>
    )
}

export default FileUploadSection;