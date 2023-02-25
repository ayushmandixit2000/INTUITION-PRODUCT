import React, { Component, useState, useEffect } from "react";
import "react-icons/md";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function NewsList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const url =
      "https://newsapi.org/v2/top-headlines?language=en&category=health&apiKey=abd5a038e2124c18b79b733c3d81796e";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles.slice(0, 10)); // get the first 10 articles
      })
      .catch((error) => console.log(error));
  }, []);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      <h2 className="text-center font-bold text-3xl mx-auto mt-4 animate-text bg-gradient-to-r from-teal-500 via-yellow-300 to-orange-500 bg-clip-text text-transparent mb-4">
        Recent Healthcare updates
      </h2>
      <ul>
        <div className="relative flex items-center w-screen">
          <div className="text-white ml-2">
            <MdChevronLeft
              className="opacity-50 cursor-pointer hover:opacity-100"
              onClick={slideLeft}
              size={100}
            />
          </div>
          <div
            id="slider"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            style={{}}
          >
            <div className="flex flex-nowrap justify-between gap-6 w-screen px-8 mb-8 mt-4">
              {articles.map((article) => (
                <div className="mt-4 w-1/4 p-8 hover:scale-105 ease-in-out duration-300 text-center shadow-lg rounded-xl border-2 border-orange-200 ">
                  <li className="text-white " key={article.url}>
                    <br />
                    <div className="mx-auto h-60 flex items-center justify-center">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        width="200"
                        height="auto"
                        className="mx-auto"
                      />
                    </div>
                    <br />
                    <a
                      href={article.url}
                      className="block font-bold text-xl mt-4 whitespace-normal break-words"
                    >
                      {article.title}
                    </a>
                    {""}
                    <div className="py-2 flex justify-center items-center whitespace-normal break-words">
                      <p>
                        - {article.author} ({article.source.name})
                      </p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <h3 className="text-white text-2xl mt-2 mb-2 font-bold">
                      Summary
                    </h3>
                    <p className="whitespace-normal break-words">
                      {article.description}
                    </p>
                    <br />
                    <p className="mb-2">{article.publishedAt}</p>
                  </li>
                </div>
              ))}
            </div>
          </div>
          <div className="text-white mr-2">
            <MdChevronRight
              className="opacity-50 cursor-pointer hover:opacity-100"
              onClick={slideRight}
              size={100}
            />
          </div>
        </div>
      </ul>
    </div>
  );
}

export default NewsList;
