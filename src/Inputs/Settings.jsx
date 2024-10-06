import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useFontContext } from "../context/FontContext";

function Settings({ settings, setSettings }) {
  const [ayahs, setAyahs] = useState();
  // State to store the current theme
  const [theme, setTheme] = useState("sepia");

  // Effect to load the theme from localStorage when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "sepia";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const {
    font,
    setFont,
    setFontSize,
    fontSize,
    textSizeClasses,
    fontSizeTranslation,
    setFontSizeTranslation,
  } = useFontContext();

  // Increment font size handler
  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 1, textSizeClasses.length - 1)); // Max limit is the length of textSizeClasses array
  };

  // Decrement font size handler
  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 1, 0)); // Min limit is 0 (text-xs)
  };
  const increaseFontSizeTranslation = () => {
    setFontSizeTranslation((prev) =>
      Math.min(prev + 1, textSizeClasses.length - 1)
    ); // Max limit is the length of textSizeClasses array
  };

  // Decrement font size handler
  const decreaseFontSizeTranslation = () => {
    setFontSizeTranslation((prev) => Math.max(prev - 1, 0)); // Min limit is 0 (text-xs)
  };
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme); // Save the theme in localStorage
  };
  useEffect(() => {
    // Fetching verses from Quran API
    axios
      .get(`http://api.alquran.cloud/v1/surah/1?offset=1&limit=1`)
      .then((response) => {
        setAyahs(response.data.data.ayahs[0].text);
        console.log(response.data.data.ayahs[0].text);
      })
      .catch((error) => {
        console.error("There was an error fetching the Quranic data!", error);
      });
  }, []);

  // List of available fonts
  const fonts = [
    { name: "Uthmani", class: "font-uthmani" },
    { name: "Amiri", class: "font-amiri" },
    { name: "Droid Arabic Kufi", class: "font-droid-arabic-kufi" },
    { name: "Droid Arabic Naskh", class: "font-droid-arabic-naskh" },
    { name: "Thabit", class: "font-thabit" },
    { name: "Me Quran", class: "font-mequran" },
    { name: "Me Quran 2", class: "font-mequran2" },
    { name: "Noore Hidayah", class: "font-nh" },
    { name: "Othmani", class: "font-othmani" },
    { name: "Quran", class: "font-quran" },
    { name: "Scheherazade", class: "font-scheherazade" },
    { name: "Naskh", class: "font-naskh" },
    { name: "Kitab", class: "font-kitab" },
    { name: "Kitab Bold", class: "font-kitab-bold" },
  ];

  return (
    <div
      className={`bg-background fixed top-0 right-0 h-full w-64 shadow-lg transform transition-transform duration-300 z-[999] ${
        settings ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close button */}
      <div className="p-2 flex justify-end">
        <IoMdClose
          size={25}
          className="cursor-pointer text-text transition-colors"
          onClick={() => setSettings(false)}
        />
      </div>

      {/* Font selection buttons */}
      <div className="p-2 flex flex-col gap-2">
        <div className="h-48 overflow-y-scroll flex flex-col gap-2">
          {fonts.map((fontItem) => (
            <button
              key={fontItem.class}
              className={`text-sm px-3 py-1 rounded-md text-btnText ${fontSize} ${
                font === fontItem.class ? "bg-btn" : "bg-btn"
              } `}
              onClick={() => setFont(fontItem.class)}
            >
              {fontItem.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div className="text-base">Arabic Font Size</div>
          <div className="flex gap-2">
            <button
              onClick={decreaseFontSize}
              className="text-sm px-3 py-1 rounded-md text-btnText bg-btn "
            >
              -
            </button>

            {/* Font size increase button */}
            <button
              onClick={increaseFontSize}
              className="text-sm px-3 py-1 rounded-md text-btnText bg-btn "
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-base">English Font Size</div>
          <div className="flex gap-2">
            <button
              onClick={decreaseFontSizeTranslation}
              className="text-sm px-3 py-1 rounded-md text-btnText bg-btn "
            >
              -
            </button>

            {/* Font size increase button */}
            <button
              onClick={increaseFontSizeTranslation}
              className="text-sm px-3 py-1 rounded-md text-btnText bg-btn "
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Display fetched ayah */}
      <div
        className={`p-4 text-white ${font} text-2xl leading-relaxed bg-green-950 m-2`}
      >
        {ayahs ? ayahs : "Loading..."}
      </div>
      <div className="px-4">
        <label
          htmlFor="theme-select"
          className="block mb-2 text-sm font-medium text-text"
        >
          Choose Theme:
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={handleThemeChange}
          className="bg-background border border-primary text-text text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        >
          <option value="sepia">Sepia</option>
          <option value="dark">Dark</option>

          <option value="ocean">Ocean</option>
          <option value="forest">Forest</option>
          <option value="sunset">Sunset</option>
          <option value="lavender">Lavender</option>
          <option value="rose">Rose</option>
          <option value="slate">Slate</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
