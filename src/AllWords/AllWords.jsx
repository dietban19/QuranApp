import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { collection, getDocs, doc, query } from "firebase/firestore";
import { db } from "../config/firebase";
import WordDetails from "./WordDetails";

function AllWords() {
  const [transliterationList, setTransliterationList] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        console.log("Fetching words...");

        // Step 1: Get all Surah documents
        const surahsCollection = collection(db, "surahs");
        const surahsSnapshot = await getDocs(surahsCollection);

        const surahsQuery = await getDocs(collection(db, "surahs"));
        let transliterations = [];

        // Step 2: Iterate over each Surah document
        for (const surahDoc of surahsQuery.docs) {
          const surahId = surahDoc.id;

          // Step 3: Get the Ayahs subcollection for this surah
          const ayahsQuery = await getDocs(
            collection(db, "surahs", surahId, "ayahs")
          );

          // Step 4: For each Ayah, extract the transliteration and its related data
          ayahsQuery.docs.forEach((ayahDoc) => {
            const ayahData = ayahDoc.data();
            const transliteration = ayahData.transliteration;
            const input = ayahData.input;
            if (transliteration) {
              // Push an object with transliteration and corresponding ayahData
              transliterations.push({
                transliteration,
                data: ayahData, // Add the full ayah data
                arabic: input,
              });
            }
          });
        }
        // Step 5: Sort the transliterations by their frequency of occurrence
        const sortedTransliterations =
          countAndSortTransliterations(transliterations);
        setTransliterationList(sortedTransliterations);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchWords();
  }, []);

  // Helper function to count occurrences and sort
  const countAndSortTransliterations = (transliterations) => {
    const transliterationCount = {};

    // Count occurrences and aggregate data by transliteration
    transliterations.forEach((entry) => {
      const { transliteration, data, arabic } = entry;
      // If this transliteration has been seen before, increment the count
      // Otherwise, initialize it with count and an array of data
      if (transliterationCount[transliteration]) {
        transliterationCount[transliteration].count += 1;
        transliterationCount[transliteration].data.push(data);
        transliterationCount[transliteration].arabic.push(arabic); // Add Arabic to existing array
      } else {
        transliterationCount[transliteration] = {
          count: 1,
          data: [data], // Store associated ayah data
          arabic: [arabic], // Store corresponding Arabic text in an array
        };
      }
    });

    // Convert the object to an array and sort by frequency
    const sorted = Object.entries(transliterationCount)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([transliteration, value]) => ({
        transliteration,
        count: value.count,
        data: value.data, // Include all the related data for this transliteration
        arabic: value.arabic,
      }));

    return sorted;
  };
  // Render list (you can modify this based on your UI requirement)
  const [chosenIndex, setChosenIndex] = useState();
  const [chosenWord, setChosenWord] = useState();
  return (
    <div className="min-h-screen flex flex-col items-center py-10 w-full bg-emerald-900">
      <div className="relative bg-emerald-800 shadow-lg rounded-lg p-8 w-full max-w-4xl ">
        <h1 className="text-3xl font-bold text-white mb-8 text-center ">
          All Words
        </h1>
        <ul className="space-y-6 h-[35rem] overflow-y-scroll ">
          {transliterationList.map((item, index) => (
            <Fragment key={index}>
              <li
                onClick={() => {
                  setChosenIndex(index);
                  setChosenWord(item);
                }}
                className="hover:bg-emerald-600  p-4  cursor-pointer border-b border-emerald-600 pb-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-100">
                      {item.transliteration}
                    </h2>
                    <p className="text-sm text-gray-400">Count: {item.count}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-gray-200 arabic-text">
                      {item.arabic[0]}
                    </p>
                  </div>
                </div>
              </li>
              {chosenIndex === index && (
                <>
                  <WordDetails
                    chosenWord={chosenWord}
                    setChosenIndex={setChosenIndex}
                    setChosenWord={setChosenWord}
                  />
                </>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllWords;
