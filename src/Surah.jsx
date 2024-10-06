import React, { useEffect, useState } from "react";
import axios from "axios";
function Surah({ selectedChapter }) {
  const [ayahs, setAyahs] = useState([]);
  useEffect(() => {
    // Fetching verses from Quran API
    if (selectedChapter) {
      axios
        .get(
          `https://api.quran.com/api/v4/verses/by_chapter/${selectedChapter.id}?words=true`
        ) // Example: Surah Al-Fatiha
        .then((response) => {
          console.log(response.data);
          setAyahs(response.data.verses);
        })
        .catch((error) => {
          console.error("There was an error fetching the Quranic data!", error);
        });
    }
  }, [selectedChapter]);
  return (
    <div>
      <h1>Quran App</h1>
      <div className="text-lg">
        {ayahs.map((ayah, index) =>
          ayah.words.map((word) => <div key={word.id}>{word.text}</div>)
        )}
      </div>
    </div>
  );
}

export default Surah;
