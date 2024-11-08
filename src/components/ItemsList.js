import { addItem } from "../utils/cartSlice";
import { CDN_image } from "../utils/constants";
import { useDispatch } from "react-redux";

const ItemsList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex p-4 m-4 bg-white rounded-lg shadow-lg"
        >
          <div className="w-3/4 pr-4">
            <div className="pb-2">
              <span className="text-lg font-semibold">
                {item.card.info.name}
              </span>
              <span className="text-lg text-green-600 ml-2">
                - 💲
                {(item.card.info.defaultPrice ?? item.card.info.price) / 100}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {item.card.info.description}
            </p>
          </div>
          <div className="w-1/4 flex flex-col justify-center items-center">
            <img
              src={CDN_image + item.card.info.imageId}
              alt={item.card.info.name}
              className="rounded-lg w-24 h-24 object-cover mb-2"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => handleAddItem(item)}
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
