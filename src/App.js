import React from "react";
import UploadFile from "./components/UploadFile";
import NewsList from "./components/NewsList";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Hero />
      <div className="flex flex-wrap justify-center">
        <UploadFile />
        <NewsList />
      </div>
    </div>
  );
}

export default App;
