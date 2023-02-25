import React from "react";

function Summary(props) {
  return (
    <>
      {props.text ? (
        <div className="lg:flex lg:justify-center">
          <div className="text-center shadow-lg p-10 rounded-xl my-10 border-2 dark:border-orange-200">
            <div className="text-center text-white">
              <p>{props.text}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Summary;


