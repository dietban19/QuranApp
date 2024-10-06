import React from "react";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-900 w-full">
      <div className="bg-emerald-700 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-green-500">Main Menu</h1>
        <div className="space-y-4">
          {/* Button for Quran */}
          <button
            onClick={() => navigate("/quran")}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Go to Quran
          </button>

          {/* Button for Word */}
          <button
            onClick={() => navigate("/words")}
            className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Go to Word
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
