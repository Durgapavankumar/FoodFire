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
      const response = await fetch(Menu_API + resId);
      const json = await response.json();

      // Set restaurant data
      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      setResInfo(restaurantData);

      console.log(json?.data?.cards);
      const fetchedCategories =
        json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (x) =>
            x.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];

      console.log(fetchedCategories);
      setCategories(fetchedCategories); // Set the fetched categories to state

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
      setResInfo(null);
      console.log(error);
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
