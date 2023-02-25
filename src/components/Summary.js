import React from "react";

function Summary(props) {
  return (
    <>
    <div className="p-2 text-center text-white">
    <p>{props.text}</p>
    </div>
    </>
  );
}

export default Summary;
