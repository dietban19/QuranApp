// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// import { db } from "../config/firebase";

// const GetData = ({ selectedChapterOther }) => {
//   const [chapter, setChapter] = useState("");

//   const getData = async (chapter, page = 1, allVerses = []) => {
//     if (selectedChapterOther) {
//       try {
//         const response = await axios.get(
//           `https://api.quran.com/api/v4/verses/by_chapter/${selectedChapterOther.id}?translations=131&per_page=50&page=${page}&fields=text_uthmani`
//         );

//         const verses = response.data.verses;
//         const totalPages = response.data.pagination.total_pages;

//         // Concatenate the new verses with the previously fetched ones
//         const updatedVerses = [...allVerses, ...verses];

//         if (page < totalPages) {
//           // If more pages exist, recursively fetch the next page
//           await getData(chapter, page + 1, updatedVerses);
//         } else {
//           // Once all pages are fetched, save the data to Firestore
//           const chapterDocRef = doc(
//             db,
//             "chapters",
//             `chapter_${selectedChapterOther.id}`
//           );

//           const chapterData = {
//             chapter_number: selectedChapterOther.id,
//             verses: updatedVerses.map((verse) => ({
//               id: verse.id,
//               arabic: verse.text_uthmani,
//               verse_number: verse.verse_number,
//               verse_key: verse.verse_key,
//               hizb_number: verse.hizb_number,
//               rub_el_hizb_number: verse.rub_el_hizb_number,
//               ruku_number: verse.ruku_number,
//               manzil_number: verse.manzil_number,
//               sajdah_number: verse.sajdah_number,
//               page_number: verse.page_number,
//               juz_number: verse.juz_number,
//               translations: verse.translations.map((translation) => ({
//                 id: translation.id,
//                 resource_id: translation.resource_id,
//                 text: translation.text,
//               })),
//             })),
//           };

//           // Add or update the document in Firestore
//           await setDoc(chapterDocRef, chapterData);

//           console.log(
//             `Chapter ${chapter} data added to Firestore successfully!`
//           );
//         }
//       } catch (error) {
//         console.error(
//           "There was an error fetching the Quranic data or saving to Firestore!",
//           error
//         );
//       }
//     }
//   };
//   //   const getData = async (chapterNumber) => {
//   //     try {
//   //       // Assuming you fetch the data like this, if not, use the provided JSON directly
//   //       const response = await axios.get(
//   //         `http://api.alquran.cloud/v1/surah/${chapterNumber}` // Replace with actual endpoint
//   //       );

//   //       const surahData = response.data.data; // The JSON object you provided

//   //       // Create a reference to the Firestore collection 'surah'
//   //       const surahDocRef = doc(db, "surah", `surah_${surahData.number}`);

//   //       // Prepare the data to be saved as a document in Firestore
//   //       const surahFirestoreData = {
//   //         number: surahData.number,
//   //         name: surahData.name,
//   //         englishName: surahData.englishName,
//   //         englishNameTranslation: surahData.englishNameTranslation,
//   //         revelationType: surahData.revelationType,
//   //         numberOfAyahs: surahData.numberOfAyahs,
//   //         ayahs: surahData.ayahs.map((ayah) => ({
//   //           number: ayah.number,
//   //           text: ayah.text,
//   //           numberInSurah: ayah.numberInSurah,
//   //           juz: ayah.juz,
//   //           manzil: ayah.manzil,
//   //           page: ayah.page,
//   //           ruku: ayah.ruku,
//   //           hizbQuarter: ayah.hizbQuarter,
//   //           sajda: ayah.sajda,
//   //         })),
//   //         edition: {
//   //           identifier: surahData.edition.identifier,
//   //           language: surahData.edition.language,
//   //           name: surahData.edition.name,
//   //           englishName: surahData.edition.englishName,
//   //           format: surahData.edition.format,
//   //           type: surahData.edition.type,
//   //           direction: surahData.edition.direction,
//   //         },
//   //       };

//   //       // Add or update the document in Firestore
//   //       await setDoc(surahDocRef, surahFirestoreData);

//   //       console.log(
//   //         `Surah ${chapterNumber} data added to Firestore successfully!`
//   //       );
//   //     } catch (error) {
//   //       console.error(
//   //         "There was an error fetching the Surah data or saving it to Firestore!",
//   //         error
//   //       );
//   //     }
//   //   };
//   const handleInputChange = (e) => {
//     setChapter(e.target.value); // Update chapter with the input value
//   };

//   const handleButtonClick = () => {
//     if (selectedChapterOther.id) {
//       getData(selectedChapterOther.id); // Call getData with the current chapter state
//     } else {
//       console.error("Please enter a chapter number.");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         value={chapter}
//         onChange={handleInputChange}
//         placeholder="Enter chapter number"
//       />
//       <button onClick={handleButtonClick}>Get Data</button>
//     </div>
//   );
// };

// export default GetData;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const GetData = () => {
  const [chapter, setChapter] = useState("");

  //   const getData = async (chapterId, page = 1, allVerses = []) => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?translations=131&per_page=50&page=${page}&fields=text_uthmani`
  //       );

  //       const verses = response.data.verses;
  //       const totalPages = response.data.pagination.total_pages;

  //       // Concatenate the new verses with the previously fetched ones
  //       const updatedVerses = [...allVerses, ...verses];

  //       if (page < totalPages) {
  //         // If more pages exist, recursively fetch the next page
  //         await getData(chapterId, page + 1, updatedVerses);
  //       } else {
  //         // Once all pages are fetched, save the data to Firestore
  //         const chapterDocRef = doc(db, "chapters", `chapter_${chapterId}`);

  //         const chapterData = {
  //           chapter_number: chapterId,
  //           verses: updatedVerses.map((verse) => ({
  //             id: verse.id,
  //             arabic: verse.text_uthmani,
  //             verse_number: verse.verse_number,
  //             verse_key: verse.verse_key,
  //             hizb_number: verse.hizb_number,
  //             rub_el_hizb_number: verse.rub_el_hizb_number,
  //             ruku_number: verse.ruku_number,
  //             manzil_number: verse.manzil_number,
  //             sajdah_number: verse.sajdah_number,
  //             page_number: verse.page_number,
  //             juz_number: verse.juz_number,
  //             translations: verse.translations.map((translation) => ({
  //               id: translation.id,
  //               resource_id: translation.resource_id,
  //               text: translation.text,
  //             })),
  //           })),
  //         };

  //         // Add or update the document in Firestore
  //         await setDoc(chapterDocRef, chapterData);

  //         console.log(
  //           `Chapter ${chapterId} data added to Firestore successfully!`
  //         );
  //       }
  //     } catch (error) {
  //       console.error(
  //         "There was an error fetching the Quranic data or saving to Firestore!",
  //         error
  //       );
  //     }
  //   };

  const getData = async (chapterNumber) => {
    try {
      // Assuming you fetch the data like this, if not, use the provided JSON directly
      const response = await axios.get(
        `http://api.alquran.cloud/v1/surah/${chapterNumber}` // Replace with actual endpoint
      );

      const surahData = response.data.data; // The JSON object you provided

      // Create a reference to the Firestore collection 'surah'
      const surahDocRef = doc(db, "surah", `surah_${surahData.number}`);

      // Prepare the data to be saved as a document in Firestore
      const surahFirestoreData = {
        number: surahData.number,
        name: surahData.name,
        englishName: surahData.englishName,
        englishNameTranslation: surahData.englishNameTranslation,
        revelationType: surahData.revelationType,
        numberOfAyahs: surahData.numberOfAyahs,
        ayahs: surahData.ayahs.map((ayah) => ({
          number: ayah.number,
          text: ayah.text,
          numberInSurah: ayah.numberInSurah,
          juz: ayah.juz,
          manzil: ayah.manzil,
          page: ayah.page,
          ruku: ayah.ruku,
          hizbQuarter: ayah.hizbQuarter,
          sajda: ayah.sajda,
        })),
        edition: {
          identifier: surahData.edition.identifier,
          language: surahData.edition.language,
          name: surahData.edition.name,
          englishName: surahData.edition.englishName,
          format: surahData.edition.format,
          type: surahData.edition.type,
          direction: surahData.edition.direction,
        },
      };

      // Add or update the document in Firestore
      await setDoc(surahDocRef, surahFirestoreData);

      console.log(
        `Surah ${chapterNumber} data added to Firestore successfully!`
      );
    } catch (error) {
      console.error(
        "There was an error fetching the Surah data or saving it to Firestore!",
        error
      );
    }
  };
  const handleButtonClick = async () => {
    try {
      for (let chapterId = 6; chapterId <= 114; chapterId++) {
        await getData(chapterId); // Fetch data for each chapter from 86 to 114
      }
      console.log("Data for all chapters from 86 to 114 fetched successfully!");
    } catch (error) {
      console.error(
        "There was an error fetching data for the chapters!",
        error
      );
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        Get Data for Chapters 86 to 114
      </button>
    </div>
  );
};

export default GetData;
