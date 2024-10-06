import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  // State to store the current theme
  const [theme, setTheme] = useState("sepia");

  // Effect to load the theme from localStorage when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "sepia";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Function to handle theme change
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme); // Save the theme in localStorage
  };

  return (
    <div className="p-4">
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
        <option value="dark">Dark</option>

        <option value="sepia">Sepia</option>
        <option value="ocean">Ocean</option>
        <option value="forest">Forest</option>
        <option value="sunset">Sunset</option>
        <option value="lavender">Lavender</option>
        <option value="rose">Rose</option>
        <option value="slate">Slate</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
