import React, { useState } from "react";
import axios from "axios";

function TalkToMeForm() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/talkToMe", {
        userInput,
      });
      console.log(response.data);
      setResponse(response.data.botResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="">
            <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-2"
    >
      <label htmlFor="userInput" className="text-lg font-medium text-white">
        Enter a query about any topic and I will try to answer you!
      </label>
      <input
        type="text"
        id="userInput"
        value={userInput}
        onChange={handleUserInputChange}
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500"
      />
      <button
        className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 focus:outline-none text-black"
        type="submit"
      >
        Talk to me!
      </button>
      {response && (
        <p className="text-lg rounded-lg border-white font-medium text-white text-center mt-4">{response}</p>
      )}
    </form>
    </div>

  );
}

export default TalkToMeForm;
