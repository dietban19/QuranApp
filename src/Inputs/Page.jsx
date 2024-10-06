import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import axios from "axios";
import { IoIosSettings } from "react-icons/io";
import Settings from "./Settings";
import { useFontContext } from "../context/FontContext";
import "./loader.css";
import WordAnalysis from "./WordAnalysis";
function Page({ selectedChapter, setSettings, settings }) {
  const [verses, setVerses] = useState([]);
  const [page, setPage] = useState(1); // Start at page 1
  const [hasMore, setHasMore] = useState(true); // To track if there are more verses to load
  const [loading, setLoading] = useState(false); // To show loading indicator
  const perPage = 40; // Load 40 verses per request
  const observer = useRef();
  const [selectedWordIndex, setSelectedWordIndex] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [wordAnalysisPopup, setWordAnalysisPopup] = useState(false);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState("");

  const {
    font,
    fontSize,
    textSizeClasses,
    fontSizeTranslation,
    setFontSizeTranslation,
    colorTheme,
  } = useFontContext();
  // Fetch verses from API
  const fetchVerses = async (chapterNumber, page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${chapterNumber.id}?translations=131&page=${page}&per_page=${perPage}&words=true&fields=text_uthmani,image_url&word_fields=text_uthmani`
      );
      const data = await response.json();
      console.log("DATA: ", data.verses);
      if (data.verses.length > 0) {
        setVerses((prevVerses) => [...prevVerses, ...data.verses]);
      } else {
        setHasMore(false); // No more verses to load
      }
    } catch (error) {
      console.error("Error fetching verses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset verses and page when selectedChapter changes
  useEffect(() => {
    // Reset state when a new chapter is selected
    setVerses([]);
    setPage(1);
    setHasMore(true);

    if (selectedChapter) {
      // Fetch the first page of the new chapter
      fetchVerses(selectedChapter, 1);
    }
  }, [selectedChapter]); // Trigger when selectedChapter changes

  // Load more verses when the user scrolls to the bottom
  useEffect(() => {
    if (page > 1) {
      console.log("geeting next");
      fetchVerses(selectedChapter, page);
    }
  }, [page]); // Trigger fetching of new verses when the page changes

  // Infinite scrolling setup
  const lastVerseRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    });

    if (node) observer.current.observe(node);
  };
  verses.map((verse) => {
    // console.log(verse.translations[0].text);
  });
  const [hoveredText, setHoveredText] = useState("");
  const [hoveredTextIndex, setHoveredTextIndex] = useState();
  const [hoveredVerseIndex, setHoveredVerseIndex] = useState();

  // Step 2: Handlers for mouse enter and leave

  const handleMouseEnterWord = (wordIndex, text, verseIndex) => {
    setHoveredTextIndex(wordIndex);
    setHoveredText(text);
    setHoveredVerseIndex(verseIndex);
  };

  const handleMouseLeave = () => {
    setHoveredVerseIndex("");
    setHoveredTextIndex("");
    setHoveredText("");
  };
  console.log(hoveredText, hoveredTextIndex, hoveredVerseIndex);
  const handleSelectedWord = (index, wordIndex, text) => {
    setSelectedVerseIndex(index);
    setSelectedWordIndex(wordIndex);
    setSelectedWord(text);
    setHoveredVerseIndex("");
    setHoveredTextIndex("");
    setHoveredText("");
    console.log("TEXT: ", text);
  };

  return (
    <>
      <div className={`grow h-screen bg-primary overflow-y-scroll`}>
        <Settings settings={settings} setSettings={setSettings} />
        <WordAnalysis
          wordAnalysisPopup={wordAnalysisPopup}
          selectedWord={selectedWord}
        />
        <div className=" p-4 flex bg-background">
          <IoIosSettings
            size={25}
            className=" cursor-pointer"
            onClick={() => setSettings(true)}
          />
          <div
            className="cursor-pointer"
            onClick={() => setWordAnalysisPopup(true)}
          >
            press
          </div>
        </div>
        <Header surah={selectedChapter} />

        <div className=" overflow-y-scroll p-4">
          <ul>
            {verses.map((verse, index) => {
              const isLastVerse = verses.length === index + 1;

              return (
                <li
                  key={`${verse.id}-${index}`}
                  className="p-3 flex break-words text-text "
                  ref={isLastVerse ? lastVerseRef : null} // Attach observer to last verse for infinite scrolling
                >
                  <div className="text-lg p-2 px-4">{verse.verse_key}</div>
                  <div className="flex flex-col w-full">
                    {/* Arabic Verse */}
                    <div className="flex p-2">
                      <div
                        className={`${font} ${textSizeClasses[fontSize]} w-full max-w-[55rem] break-words break-all h-auto py-4  text-right`}
                        style={{ direction: "rtl" }} // Set the correct text direction for Arabic
                      >
                        {verse.words.map((word, wordIndex) => (
                          <span
                            onClick={() => {
                              handleSelectedWord(index, wordIndex, word);
                            }}
                            onMouseEnter={() => {
                              handleMouseEnterWord(wordIndex, word, index);
                            }}
                            onMouseLeave={handleMouseLeave}
                            key={wordIndex}
                            className={`relative cursor-pointer  my-2 mx-1 p-1 ${
                              (wordIndex === selectedWordIndex &&
                                selectedVerseIndex === index) ||
                              (wordIndex === hoveredTextIndex &&
                                index === hoveredVerseIndex)
                                ? "text-textMain"
                                : "text-text"
                            }`}
                            style={{ display: "inline-block" }}
                          >
                            {/* Tooltip rendering */}
                            {((wordIndex === selectedWordIndex &&
                              selectedVerseIndex === index) ||
                              (wordIndex === hoveredTextIndex &&
                                index === hoveredVerseIndex)) && (
                              <div className="absolute text-base mb-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white p-2 text-black  py-1 rounded shadow-lg z-10 whitespace-nowrap font-poppins">
                                {/* Display hovered text or selected text */}
                                {wordIndex === hoveredTextIndex &&
                                index === hoveredVerseIndex
                                  ? hoveredText?.translation?.text
                                  : wordIndex === selectedWordIndex &&
                                    index === selectedVerseIndex
                                  ? selectedWord?.translation?.text
                                  : null}
                              </div>
                            )}

                            {/* Display the Uthmani text */}
                            {word.text_uthmani}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Translation */}
                    <div
                      className={`break-words h-auto w-full max-w-[50rem] ${textSizeClasses[fontSizeTranslation]}`}
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: verse.translations[0].text,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          {loading && (
            <p className=" flex justify-center items-center p-3 text-text">
              <span className="loader"></span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
