import React from "react";
import UploadFile from "./components/UploadFile";
import NewsList from "./components/NewsList";
import Hero from "./components/Hero";
import TalkToMe from "./components/TalkToMe";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Hero />
      <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mb-6 w-1/3 justify-center items-center text-center">
      <TalkToMe />
      </div>
        
        <UploadFile />
        <NewsList />
      </div>
    </div>
  );
}

export default App;
