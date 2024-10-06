import React from "react";

function WordAnalysis({ wordAnalysisPopup, selectedWord }) {
  return (
    <div
      className={`bg-background fixed top-0 right-0 h-full w-64 shadow-lg transform transition-transform duration-300 z-[999] ${
        wordAnalysisPopup ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-2 text-text py-8">
        <div className="font-semibold text-lg">Word Analysis</div>
        <div className="flex flex-col ">
          <div className="text-base">{selectedWord?.text_uthmani}</div>

          <div className="text-base">{selectedWord?.translation.text}</div>
          <div className="text-base">{selectedWord?.transliteration.text}</div>
        </div>
      </div>
    </div>
  );
}

export default WordAnalysis;
