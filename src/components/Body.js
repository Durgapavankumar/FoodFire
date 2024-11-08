import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listofRestaurant, setListofRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");

  const handleFilterClick = () => {
    const filteredRestaurant = listofRestaurant.filter(
      (res) => res.info.avgRating > 4.3
    );
    setfilteredRestaurant(filteredRestaurant);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true when fetching data
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.48577683211665&lng=78.61341688781977&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log("Fetched JSON:", json); // Log the entire JSON response

      // Try finding the restaurant data dynamically
      const restaurants =
        json?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      console.log("Extracted Restaurants Data:", restaurants); // Log the extracted restaurants

      setListofRestaurant(restaurants);
      setfilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Always set loading to false once fetch is complete
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return <h1>You are offline! Please check your internet 📶</h1>;

  if (isLoading) return <Shimmer />; // Show shimmer while loading

  return (
    <div className="body">
      <div className="filter flex items-center">
        <div className="search p-4 m-4 flex items-center">
          <input
            type="text"
            className="search-box border border-l-amber-700"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
          />
          <button
            className="py-2 px-4 m-2 bg-green-100 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listofRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn px-4 py-2 bg-gray-400"
          onClick={handleFilterClick}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="restaurant-container flex items-center align-middle flex-wrap">
        {filteredRestaurant.length > 0 ? (
          filteredRestaurant.map((restaurant, index) => {
            const info = restaurant.info || {};
            return (
              <Link key={info.id || index} to={"restaurant/" + info.id}>
                <RestaurantCard resData={{ info }} />
              </Link>
            );
          })
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
    </div>
  );
};

export default Body;
