import React, { useState } from 'react';
import axios from 'axios';

function UploadFile() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [summary, setSummary] = useState("");

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('pdf_file', selectedFile);
        axios.post('http://127.0.0.1:5000/paperUpload', formData)
            .then(response => {
                console.log(response.data);
                setSummary(response.data);
                setLoaded(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={handleFileUpload}>Upload PDF</button>
            <h1>Summary</h1>
            {loaded ? <p>{summary}</p> : <p>loading...</p>}
        </div>
    );
}

export default UploadFile;