import React, { useEffect, useState } from "react";
import axios from "axios";

// AyahComponent to fetch ayah and render Uthmani script and translation
const AyahComponent = ({ verseKey, surah }) => {
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching verses from Quran API
    if (surah) {
      axios
        .get(`http://api.alquran.cloud/v1/surah/${surah.id}`)
        .then((response) => {
          setAyah(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the Quranic data!", error);
          setError("Error fetching data");
          setLoading(false);
        });
    }
  }, [surah]);

  if (loading) {
    return <div className="text-emerald-500 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }
  console.log(ayah);
  return (
    <div className="p-6 grow bg-emerald-50 rounded-lg shadow-lg">
      <h2 className="text-emerald-800 text-xl font-bold text-center mb-6">
        Surah {ayah.englishName} ({ayah.name})
      </h2>
      {ayah.ayahs.map((verse, index) => (
        <div key={index} className="mb-4">
          <div className="w-[35rem] text-xl bg-red-100 h-auto font-kitab text-emerald-600 mb-2 break-words">
            {verse.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AyahComponent;
