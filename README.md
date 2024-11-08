#React Course Day 1

/\*\*

- Header
- -logo
- -Nav items
-
- Body
- -Search Bar
- -Restaurant container
- --RestaurantCard
-
- Footer
- -Copyright
- -links
- -address
- -Contact
- \*/

Two types of Export / Imports

export default component
import component from path

export const component
import {component} from path

import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import restaurantslist from "../utils/mockData";
import Shimmer from "./Shimmer";

const Body = () => {
const [listofRestaurant, setListofRestaurant] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [filteredRestaurant, setfilteredRestaurant] = useState([]);
const [searchText, setsearchText] = useState("");

const handleFilterClick = () => {
console.log("Filter button clicked");
const filteredRestaurant = listofRestaurant.filter(
(res) => res.info.avgRating > 4.3
);
console.log("Filtered List: ", filteredRestaurant);
setfilteredRestaurant(filteredRestaurant);
};

useEffect(() => {
fetchData();
}, []);

const fetchData = async () => {
try {
// const response = await fetch(
// "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
// );

      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&%ls-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();

      // Optional Chaining
      console.log(json);
      // const restaurants =
      //   json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle ?.restaurants || [];
      const restaurants =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      console.log(restaurants);
      setListofRestaurant(restaurants);
      setfilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setListofRestaurant([]); // Set an empty array in case of error
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched
    }

};

// if (listofRestaurant.length === 0) {
// return <Shimmer />;
// }

return listofRestaurant.length === 0 ? (
<Shimmer />
) : (

<div className="body">
<div className="filter">
<div className="search">
<input
type="text"
className="search-box"
value={searchText}
onChange={(e) => {
setsearchText(e.target.value);
}} ></input>
<button
onClick={() => {
console.log(searchText);
const filteredRestaurant = listofRestaurant.filter((res) =>
res.info.name.toLowerCase().includes(searchText.toLowerCase())
);
setfilteredRestaurant(filteredRestaurant);
}} >
Search
</button>
</div>
<button className="filter-btn" onClick={handleFilterClick}>
Top Rated Restaurant
</button>
</div>
<div className="restaurant-container">
{listofRestaurant.length > 0 ? (
filteredRestaurant.map((restaurant, index) => {
const info = restaurant.info || {};
return <RestaurantCard key={info.id || index} resData={{ info }} />;
})
) : (
<p>No restaurants available</p>
)}
</div>
</div>
);
};

export default Body;

css
.logo {
width: 100px;
}
.header {
display: flex;
justify-content: space-between;
border: 1px solid black;
}
.nav-items > ul {
font-size: 24px;
display: flex;
list-style-type: none;
}
.nav-items > ul > li {
padding: 10px;
margin: 10px;
}
.restaurant-container {
display: flex;
flex-wrap: wrap;
}
.rest-card {
margin: 5px;
padding: 5px;
width: 200px;
height: 450px;
}
.rest-card:hover {
border: 5px, solid, rgb(0, 0, 0);
cursor: pointer;
}
.rest-logo {
width: 100%;
height: 200px;
border: 1px, solid, black;
}
.search {
padding: 10px;
}
.filter-btn {
margin: 10px;
cursor: pointer;
}
.shimmer-container {
display: flex;
flex-wrap: wrap;
}
.shimmerCard {
height: 200px;
width: 200px;
background-color: #f0f0f0;
}
.btn-login {
padding: 20px;
margin: 10px;
cursor: pointer;
}
.filter {
display: flex;
}
.user-component {
border: 2px solid black;
padding: 10px;
}

Restaurant Menu
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import {
Menu_API,
MENU_ITEM_TYPE_KEY,
RESTAURANT_TYPE_KEY,
} from "../utils/constants";

const RestaurantMenu = () => {
const [resinfo, setresinfo] = useState(null);
const [menuItems, setMenuItems] = useState([]);
useEffect(() => {
fetchMenu();
}, []);

const { resId } = useParams();
console.log(resId);
const fetchMenu = async () => {
try {
const response = await fetch(Menu_API + resId);
const json = await response.json();

      // Set restaurant data
      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      setresinfo(restaurantData);

      // Set menu item data
      const menuItemsData =
        json?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setresinfo(null);
      console.log(error);
    }

};
if (resinfo === null) return <Shimmer />;

return (

<div>
<h1>Helooo</h1>

      <h1>{resinfo?.name}</h1>
      <h2>{resinfo?.costForTwoMessage}</h2>
      <p>{resinfo?.cuisines.join(",")}</p>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((items) => (
          <li key={items.id}>
            {items.name}-{"Rs."}
            {items.price / 100}
          </li>
        ))}
      </ul>
    </div>

);
};

export default RestaurantMenu;

import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({});
export default appStore;
