import React from "react";

function Summary(props) {


  const summarySection = props.text.map((summary,y) => {
    return (
      <div className="lg:flex lg:justify-center">
        <div className="text-center w-2/3 shadow-lg m-10 p-10 rounded-xl my-10 border-2 dark:border-orange-200">
          <div className="text-start text-white">
            <h1 className="text-3xl font-bold mb-3">Slide {y+1}</h1>
            <p className="whitespace-pre-line">{summary}</p>
          </div>
        </div>
      </div>
    );
  })

  console.log(summarySection)
  return (
    <>
      {props.text ? (
        <div className="lg:flex lg:justify-center">
          <div className="text-center shadow-lg m-10 p-10 rounded-xl my-10 border-2 dark:border-orange-200">
            <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-6">Summary</h1>
              <p>{summarySection}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Summary;


