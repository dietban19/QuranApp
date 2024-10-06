import React from "react";
import { IoMdClose } from "react-icons/io";
function WordDetails({ chosenWord, setChosenWord, setChosenIndex }) {
  console.log(chosenWord);
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-60 flex justify-center items-center">
      <div className="w-[25rem] bg-emerald-800 p-4 flex flex-col justify-center items-center">
        <div className="flex justify-end w-full">
          <IoMdClose
            size={25}
            className="text-emerald-600 cursor-pointer"
            onClick={() => {
              setChosenWord();
              setChosenIndex();
            }}
          />
        </div>
        <div className=" text-emerald-200 text-xl font-bold">
          {chosenWord.arabic[0]}
        </div>
        <div className=" text-emerald-400 text-xl font-semibold">
          {chosenWord.transliteration}
        </div>
        <div className=" mt-4 w-full">
          {chosenWord &&
            chosenWord.data.map((data) => (
              <div
                className="flex flex-col gap-1 bg-emerald-700 p-2 rounded-xl mb-2"
                key={data.id}
              >
                <div className="text-neutral-300 text-lg">
                  {data.surah_name}
                </div>
                <div className="flex gap-2">
                  <div className="text-base">Verse Number</div>
                  <div className="text-base">{data.verse_number}</div>
                </div>
                <div className="flex gap-2">
                  <div className="text-base">{data.input}</div>
                </div>
                <div className="flex gap-2">
                  <div className="text-base">Translation</div>
                  <div className="text-base">{data.translation}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WordDetails;
