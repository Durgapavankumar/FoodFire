import { useState } from "react";
import ItemsList from "./ItemsList";

const RestaurantCategory = ({ category, data, showItems, setShowIndex }) => {
  const handleClick = () => {
    console.log("clicked");
    setShowIndex();
  };
  return (
    <div className="w-6/12 bg-green-200 p-4 mx-auto my-4 rounded-lg shadow-md">
      <div
        className="flex justify-between cursor-pointer font-bold text-md"
        onClick={handleClick}
      >
        <span>
          {data.title} ({data.itemCards.length})
        </span>
        <span>{showItems ? "⬆️" : "⬇️"}</span>
      </div>
      {showItems && <ItemsList items={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
