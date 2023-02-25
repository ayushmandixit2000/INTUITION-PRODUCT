import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    try {
      const response = await axios.post('http://127.0.0.1:5000/paperUpload', formData);
      setOutput(response.data);
      console.log("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileUpload} className="py-1 px-2 rounded-md bg-orange-300 text-black font-semibold" />
        <button type="submit">Summarise</button>
      </form>
      {output && <p>{output}</p>}
    </div>
  );
}

export default FileUpload;
