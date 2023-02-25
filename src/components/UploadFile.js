import React, { useState } from "react";
import axios from "axios";
import Summary from "./Summary";

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePPTXDownload = () => {
    // Define the request parameters
    const slides = summary.map((item, index) => ({
      summary: item,
      image_url: imageUrls[index]
    }));

    // Make the API request using axios
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { my_list: slides },
      responseType: 'blob'
    };
    
    // Make the API request using axios
    axios("http://127.0.0.1:5000/getPPT", request)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const fileName = 'my_file.pptx';
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        // Clean up the URL object after download is complete
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }, 0);
      })
      .catch((error) => console.error(error));
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    setSummary([]);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("pdf_file", selectedFile);
    axios
      .post("http://127.0.0.1:5000/getSummary", formData)
      .then((response) => {
        console.log(response.data);
        const summaryData = response.data;
        axios
          .get("http://127.0.0.1:5000/api/get_image_urls")
          .then((response) => {
            setImageUrls(response.data.imageUrls);
            setSummary(summaryData);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="text-white text-center">
        Upload a research paper below to get a quick summary!
      </div>
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

        {summary && summary.length > 0 ? (
          <button
            onClick={handlePPTXDownload}
            className="mx-1 ocus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900"
          >
            Download PPTX
          </button>
        ) : null}
      </div>

      <Summary text={summary} images={imageUrls} loading={isLoading} />
    </div>
  );
}

export default UploadFile;
