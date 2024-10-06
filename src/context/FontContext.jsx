import React, { createContext, useContext, useState } from "react";

// Create the context
const FontContext = createContext();

// Create a provider component
export const FontProvider = ({ children }) => {
  const [font, setFont] = useState("font-uthmani");
  const [fontSize, setFontSize] = useState(6);
  const [fontSizeTranslation, setFontSizeTranslation] = useState(4);
  const [colorTheme, setColorTheme] = useState("sepia");
  const textSizeClasses = [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl",
  ];
  return (
    <FontContext.Provider
      value={{
        font,
        setFont,
        fontSize,
        setFontSize,
        textSizeClasses,
        fontSizeTranslation,
        setFontSizeTranslation,
        colorTheme,
        setColorTheme,
      }}
    >
      {children}
    </FontContext.Provider>
  );
};

// Create a custom hook to use the FontContext
export const useFontContext = () => {
  const context = useContext(FontContext);

  if (!context) {
    throw new Error("useFontContext must be used within a FontProvider");
  }

  return context;
};
