import React from "react";

function Summary(props) {

  const slides = props.text.map((item, index) => ({
    summary: item,
    image_url: props.images[index]
  }));

  console.log(slides)

  const summarySection = slides.map((item, y) => {
    return (
      <div className="text-center w-1/4 shadow-lg m-10 p-10 rounded-xl border-2 dark:border-orange-200">
        <div className="text-white">
          <h1 className="text-3xl font-bold mb-2">Slide {y + 1}</h1>
          <div className="flex flex-wrap justify-center">
          <img className="rounded-xl m-2" src={item.image_url}></img>
            <p className="text-start whitespace-pre-line">{item.summary}</p>
            
          </div>
        </div>
      </div>
    );
  });

  console.log(summarySection)
  return (
    <>
      {props.text && props.text.length > 0 ? (
        <div className="text-center shadow-lg m-10 p-10 rounded-xl my-10 border-2 dark:border-orange-200">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-6">Summarised Article</h1>

            {props.isLoading ? <p>loading...</p> : null}

            <div className="flex flex-wrap justify-center">
              {summarySection}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Summary;


