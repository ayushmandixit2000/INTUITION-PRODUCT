import React, { useState } from 'react';
import axios from 'axios';
import Summary from './Summary';

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("pdf_file", selectedFile);
    axios
      .post("http://127.0.0.1:5000/paperUpload", formData)
      .then((response) => {
        console.log(response.data);
        setSummary(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex flex-wrap m-2 justify-center">
        <input
          type="file"
          onChange={handleFileSelect}
          className="p-1 mx-1 rounded-md bg-orange-300 text-black font-semibold"
        />
        <button
          onClick={handleFileUpload}
          className="mx-1 ocus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900"
        >
          Upload PDF
        </button>
      </div>
      <h1 className="text-white text-center text-3xl font-bold">Summary</h1>
      <Summary text={summary} />
    </div>
  );
}

export default UploadFile;