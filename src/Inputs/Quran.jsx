import React, { useState } from "react";
import ChaptersList from "../ChaptersList/ChaptersList";
import Inputs from "./Inputs";
import Page from "./Page";
import AyahComponent from "./AyahComponent";
import OtherList from "../ChaptersList/OtherList";
import GetData from "./GetData";

function Quran({
  setSelectedChapter,
  selectedChapter,
  setSelectedChapterOther,
  selectedChapterOther,
}) {
  const [settings, setSettings] = useState(false);
  return (
    <>
      <ChaptersList setSelectedChapter={setSelectedChapter} />
      {/* <OtherList setSelectedChapterOther={setSelectedChapterOther} />
      <GetData selectedChapterOther={selectedChapterOther} /> */}
      {/* <AyahComponent surah={selectedChapter} /> */}
      <Page
        selectedChapter={selectedChapter}
        setSettings={setSettings}
        settings={settings}
      />
      {/* <Inputs selectedChapter={selectedChapter} /> */}
    </>
  );
}

export default Quran;
