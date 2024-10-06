import React, { useState, useEffect } from "react";

const QuranVerses = ({ chapterNumber }) => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch verses from the API
    const fetchVerses = async () => {
      try {
        const response = await fetch(
          `https://api.quran.com/api/v4/verses/by_chapter/${chapterNumber}?words=true&fields=text_uthmani_simple`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setVerses(data.verses); // assuming 'verses' is the key in the response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [chapterNumber]); // This will re-fetch data when chapterNumber changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Chapter {chapterNumber}</h2>
      <ul>
        {verses.map((verse) => (
          <li key={verse.id}>{verse.text}</li> // adjust based on API response structure
        ))}
      </ul>
    </div>
  );
};

export default QuranVerses;
