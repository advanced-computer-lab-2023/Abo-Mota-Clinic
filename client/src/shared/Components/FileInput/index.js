import React, { useState } from 'react';
import './styles.css';

const FileInput = ({label, id, error, touch, ...probs}) => {
  const [filename, setFilename] = useState('');
  const {onChange} = probs;
  const [press, setPress] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPress(true);
    onChange(file);
    setFilename(file ? file.name : '');
    console.log(file);
    console.log(label);
  };

  return (
    <div className="file-input">
      <input
        {...probs}
        type="file"
        id={id}
        className="file-input__input"
        onChange={handleFileChange}
        hidden // This will hide the default file input
      />
      <label htmlFor={id} className="file-input__label">
        {filename || `Upload your ${label}`}
      </label>
      {error && press ? <div className="input-error"> {error} </div>: null}
    </div>
  );
};

export default FileInput;
