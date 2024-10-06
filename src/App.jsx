import React, { useEffect, useState } from "react";
import Chapters from "./Chapters";
import Surah from "./Surah";
import ChaptersList from "./ChaptersList/ChaptersList";
import Inputs from "./Inputs/Inputs";
import AllWords from "./AllWords/AllWords";
import { Route, Routes } from "react-router-dom";
import Quran from "./Inputs/Quran";
import MainMenu from "./MainMenu";
import QuranVerses from "./Inputs/QuranVerses";
import AyahComponent from "./Inputs/AyahComponent";
import axios from "axios";
import GetData from "./Inputs/GetData";
import ThemeSwitcher from "./Inputs/ThemeSwitcher";
function App() {
  const [selectedChapter, setSelectedChapter] = useState();
  const [selectedChapterOther, setSelectedChapterOther] = useState();

  useEffect(() => {
    // Fetching verses from Quran API
    axios
      // .get(`https://api.quran.com/api/v4/verses/by_chapter/1?translations=131`)
      .get(`http://api.alquran.cloud/v1/surah/1`)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the Quranic data!", error);
      });
  }, []);
  console.log(selectedChapterOther);
  return (
    <div className="flex flex-row  h-screen">
      {/* <Chapters setSelectedChapter={setSelectedChapter} />
      <Surah selectedChapter={selectedChapter} /> */}
      {/* <QuranVerses chapterNumber={1} /> */}
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/words" element={<AllWords />} />

        <Route
          path="/quran"
          element={
            <Quran
              setSelectedChapter={setSelectedChapter}
              selectedChapter={selectedChapter}
              selectedChapterOther={selectedChapterOther}
              setSelectedChapterOther={setSelectedChapterOther}
            />
          }
        />
      </Routes>
      {/* <GetData /> */}
      {/* <AyahComponent verseKey={"1:1"} translationId={1} tafsirId={2} /> */}

      {/* <AllWords /> */}
    </div>
  );
}

export default App;
