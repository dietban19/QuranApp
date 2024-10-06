import React, { useEffect, useState } from "react";
import axios from "axios";

function ChaptersList({ setSelectedChapter }) {
  const [allChapters, setAllChapters] = useState([]);

  useEffect(() => {
    // Fetching chapters from Quran API
    axios
      .get("https://api.quran.com/api/v4/chapters")
      .then((response) => {
        setAllChapters(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the Quranic data!", error);
      });
  }, []);
  const [index, setIndex] = useState();
  return (
    <div
      className={`bg-background  h-full w-[50rem] lg:w-[25rem] overflow-y-scroll  transition-colors duration-300 absolute lg:relative  `}
    >
      <div className="relative container mx-auto ">
        <h1 className="bg-background text-text w-full p-4 text-3xl font-bold text-center mb-6 sticky py-3 z-100 left-0 top-0 ">
          Quran Chapters
        </h1>
        <ul className="space-y-3 mt-[3rem]">
          {allChapters?.chapters?.length > 0 ? (
            allChapters.chapters.map((chapter) => (
              <li
                onClick={() => {
                  setSelectedChapter(chapter);
                  setIndex(chapter.id);
                }}
                key={chapter.id}
                className={`p-4  rounded-lg cursor-pointer text-text  transition-all duration-200 ${
                  chapter.id == index && "bg-secondary"
                }`}
              >
                <div
                  className={`flex justify-between items-center ${
                    chapter.id == index && "text-btnText"
                  } `}
                >
                  <span className="text-lg font-semibold">
                    {chapter.name_simple}
                  </span>
                  <span className="text-sm ">
                    {chapter.verses_count} Verses
                  </span>
                </div>
                <p className="text-sm ">{chapter.translated_name.name}</p>
              </li>
            ))
          ) : (
            <li className="text-center">No chapters available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ChaptersList;
