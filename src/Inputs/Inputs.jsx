import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore"; // Import Firestore functions
import { db } from "../config/firebase";
function Inputs({ selectedChapter }) {
  const [ayahs, setAyahs] = useState([]);
  const [inputValues, setInputValues] = useState({}); // Track inputs dynamically
  const [exists, setExists] = useState("");
  useEffect(() => {
    // Fetching verses from Quran API
    if (selectedChapter) {
      axios
        .get(
          `https://api.quran.com/api/v4/verses/by_chapter/${selectedChapter.id}?words=true&per_page=40`
        )
        .then((response) => {
          setAyahs(response.data.verses);
        })
        .catch((error) => {
          console.error("There was an error fetching the Quranic data!", error);
        });
    }
  }, [selectedChapter]);
  console.log(ayahs);
  // Handle input changes and store them in the state dynamically
  const handleInputChange = (ayahId, wordId, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [`${ayahId}-${wordId}`]: value,
    }));
  };

  // Handle submission to Firestore
  const handleSubmit = async (ayah, word) => {
    try {
      const surahQuery = query(
        collection(db, "surahs"),
        where("surah_name", "==", selectedChapter.name_simple)
      );
      const surahSnapshot = await getDocs(surahQuery);
      let surahDocRef;
      if (surahSnapshot.empty) {
        // If surah doesn't exist, create a new document
        surahDocRef = await addDoc(collection(db, "surahs"), {
          surah_name: selectedChapter.name_simple,
        });
        //   const ayahDocRef = doc(ayahCollectionRef, `${ayah.verse_number}`); // Document reference for the ayah
      } else {
        // If surah exists, get the reference to the document
        surahDocRef = surahSnapshot.docs[0].ref;
      }
      const ayahCollectionRef = collection(surahDocRef, "ayahs");
      const ayahQuery = query(
        ayahCollectionRef,
        where("word_id", "==", word.id)
      );
      const ayahSnapshot = await getDocs(ayahQuery);
      if (!ayahSnapshot.empty) {
        const existingWordData = ayahSnapshot.docs[0].data().input;
        setInputValues((prevValues) => ({
          ...prevValues,
          [`${ayah.id}-${word.id}`]: existingWordData || "",
        }));
        console.log(existingWordData);
        callExists(existingWordData);
        // If the entry already exists, prevent submission and notify the user
        console.log("This word has already been submitted.");
        return; // Prevent double submission
      }
      const ayahDocRef = await addDoc(collection(surahDocRef, "ayahs"), {
        ayah_number: ayah.verse_number,
      }); // Document reference for the ayah

      await setDoc(ayahDocRef, {
        surah_name: selectedChapter.name_simple,
        verse_number: ayah.verse_number,
        translation: word.translation.text,
        transliteration: word.transliteration.text,
        input: inputValues[`${ayah.id}-${word.id}`] || "", // Use the corresponding input value
        word_id: word.id,
      });
      //   const surahDocRef = doc(db, "surahs", selectedChapter.name_simple); // Create the document for the surah (by surah name)
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  function callExists(word) {
    setExists(word); // Set the value initially
    setTimeout(() => {
      setExists(); // Clear the value after 5 seconds
    }, 4000); // 5000 milliseconds = 5 seconds
  }
  console.log(exists);
  return (
    <>
      <div
        className={`absolute bottom-[2rem]  bg-yellow-300 text-yellow-900 p-2 font-bold transition-transform ease-in-out duration-500 text-xl ${
          exists ? "translate-x-0 right-[2rem]" : "translate-x-[12rem]  "
        }`}
        style={{ right: "2rem" }}
      >
        Exists Already {exists}
      </div>

      <div className="bg-emerald-900 grow min-h-screen">
        <Header surah={selectedChapter} />
        <div className="h-[43rem] overflow-y-scroll p-4">
          {ayahs ? (
            ayahs.map((ayah) => (
              <div
                key={ayah.id}
                className="flex flex-col gap-4 mt-3 border border-emerald-600 p-4 rounded-lg"
              >
                <div className="text-neutral-300 font-semibold">
                  Verse {ayah.verse_number}
                </div>
                <div className="flex flex-col w-full space-y-2">
                  {ayah.words.map((word) => (
                    <div
                      key={word.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="text-neutral-200 p-2 border border-emerald-700 w-1/3 text-center rounded-lg">
                        {word.translation.text}
                      </div>
                      <div className="text-neutral-200 p-2 border border-emerald-700 w-1/3 text-center rounded-lg">
                        {word.transliteration.text}
                      </div>
                      <input
                        className="w-1/3 p-2 bg-emerald-800 text-neutral-100 rounded-lg border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        type="text"
                        placeholder="Your input"
                        value={inputValues[`${ayah.id}-${word.id}`] || ""}
                        onChange={(e) =>
                          handleInputChange(ayah.id, word.id, e.target.value)
                        }
                      />
                      <button
                        onClick={() => handleSubmit(ayah, word)}
                        className="p-2 w-1/5 text-white bg-green-800 rounded-lg hover:bg-emerald-700 transition-all duration-300"
                      >
                        Submit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-neutral-200">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Inputs;
