import React, { useEffect, useState } from "react";
import axios from "axios";

function OtherList({ setSelectedChapterOther }) {
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
    <div className="h-[47rem] overflow-y-scroll bg-sepia-50 transition-colors duration-300">
      <div className="relative container mx-auto p-4">
        <h1 className="w-full text-3xl font-bold text-center mb-6 sticky py-3 z-100 left-0 top-0 ">
          Quran Chapters
        </h1>
        <ul className="space-y-3 mt-[3rem]">
          {allChapters?.chapters?.length > 0 ? (
            allChapters.chapters.map((chapter) => (
              <li
                onClick={() => {
                  setSelectedChapterOther(chapter);
                  setIndex(chapter.id);
                }}
                key={chapter.id}
                className={`p-4 bg-sepia-50  hover:bg-sepia-300 rounded-lg cursor-pointer   transition-all duration-200 ${
                  chapter.id == index && "bg-sepia-300"
                }`}
              >
                <div className="flex justify-between items-center">
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

export default OtherList;
