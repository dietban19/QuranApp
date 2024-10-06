import React, { useEffect, useState } from "react";
import axios from "axios";
function Chapters({ setSelectedChapter }) {
  const [verses, setVerses] = useState([]);
  const [allChapters, setAllChapters] = useState([]);

  useEffect(() => {
    // Fetching verses from Quran API
    axios
      // .get("https://api.quran.com/api/v4/verses/by_chapter/1") // Example: Surah Al-Fatiha
      // .get("https://api.quran.com/api/v4/verses/by_key/1:1") // Example: Surah Al-Fatiha
      .get("https://api.quran.com/api/v4/chapters") // Example: Surah Al-Fatiha

      .then((response) => {
        setAllChapters(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the Quranic data!", error);
      });
  }, []);
  return (
    <div>
      <h1>Quran App</h1>
      <ul>
        {/* {verses.map((verse) => (
          <li key={verse.id}>{verse.text_uthmani}</li>
        ))} */}
        {allChapters?.chapters?.length > 0 ? (
          allChapters.chapters.map((chapter) => (
            <li onClick={() => setSelectedChapter(chapter)} key={chapter.id}>
              {chapter.name_simple}
            </li>
          ))
        ) : (
          <li>No chapters available</li>
        )}
      </ul>
    </div>
  );
}

export default Chapters;
