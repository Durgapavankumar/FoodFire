import React from "react";

const RestaurantCard = ({ resData }) => {
  return (
    <div className="m-2 p-4 w-52 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out shadow-md">
      <img
        className="w-full h-32 object-cover rounded-t-md"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resData.info.cloudinaryImageId}`}
        alt={`${resData.info.name} logo`}
      />
      <div className="p-2">
        <h3 className="font-bold text-lg py-2">{resData.info.name}</h3>
        <h4 className="text-gray-700">{resData.info.avgRating} stars</h4>
        <h4 className="text-gray-700">{resData.info.costForTwo}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
