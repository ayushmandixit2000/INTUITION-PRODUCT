import React from "react";
import UploadFile from "./components/UploadFile";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Hero />
      <div className="flex flex-wrap justify-center">
        <UploadFile />
      </div>
    </div>
  );
}

export default App;
