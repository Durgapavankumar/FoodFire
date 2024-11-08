import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import {
  Menu_API,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [resinfo, setResInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]); // Add categories state
  const [showIndex, setShowIndex] = useState(-1); // Set initial state to -1 to keep all accordions closed initially

  useEffect(() => {
    fetchMenu();
  }, []);

  const { resId } = useParams();
  console.log(resId);

  const fetchMenu = async () => {
    try {
      console.log("Fetching menu for restaurant ID:", resId);
      const response = await fetch(Menu_API + resId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log("API response:", json);

      // Process and set restaurant data
      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      console.log("Restaurant Data:", restaurantData);
      setResInfo(restaurantData);

      // Process and set categories
      const fetchedCategories =
        json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (x) =>
            x.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];
      console.log("Fetched Categories:", fetchedCategories);
      setCategories(fetchedCategories);

      // Process and set menu items
      const menuItemsData =
        json?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] === MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      console.log("Unique Menu Items:", uniqueMenuItems);
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setMenuItems([]);
      setResInfo(null);
    }
  };

  if (resinfo === null) return <Shimmer />;

  return (
    <div className="text-center">
      <h1 className="font-bold my-6">{resinfo?.name}</h1>
      <h2>{resinfo?.costForTwoMessage}</h2>
      <div>
        {categories.map((category, index) => (
          <RestaurantCategory
            key={index}
            category={category}
            data={category?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
