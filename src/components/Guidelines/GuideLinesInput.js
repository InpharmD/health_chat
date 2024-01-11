import React, { memo } from "react";

const GuideLinesInput = memo(({ search, setSearch }) => {
    console.log("inputguide")
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleSearch}
      placeholder="Search Guideline"
      className="border border-gray-300 py-2 rounded-lg pl-10 w-[92%] box-border"
    />
  );
});
GuideLinesInput.displayName = 'GuideLinesInput';
export default GuideLinesInput;
