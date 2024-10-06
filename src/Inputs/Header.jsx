import React from "react";

function Header({ surah }) {
  return (
    <div className=" p-4 text-lg text-neutral-700">
      {surah && surah.name_simple}
    </div>
  );
}

export default Header;
