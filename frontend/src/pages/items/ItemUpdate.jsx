import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  useUpdateItemMutation,
  useSingleItemQuery,
  useGetCategoriesQuery,
} from "../../redux/rtk/all-requests";

const ItemUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get item id from route
  const [updateItem, { isLoading }] = useUpdateItemMutation();
  const { data: item } = useSingleItemQuery(id); // pass id to fetch single item
  const { data: categories } = useGetCategoriesQuery();

  const [element, setElement] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  // populate form with fetched item data
  useEffect(() => {
    if (item) {
      setElement({
        name: item.name || "",
        price: item.price || "",
        quantity: item.quantity || "",
        category: item.category?.id || "",
      });
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating item:", element);
      await updateItem({
        id,
        name: element.name,
        price: Number(element.price),
        quantity: Number(element.quantity),
        category: {
          id: Number(element.category),
        },
      });

      toast.success("Item updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update item");
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center">Update Item</p>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Name *
            </label>
            <div className="mt-2">
              <input
                name="name"
                type="text"
                value={element.name}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Price
            </label>
            <div className="mt-2">
              <input
                name="price"
                type="number"
                value={element.price}
                onChange={handleInputChange}
                className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Quantity
            </label>
            <div className="mt-2">
              <input
                name="quantity"
                type="number"
                value={element.quantity}
                onChange={handleInputChange}
                className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <select
                name="category"
                value={element.category}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
              >
                <option value="">Select a category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-gray-900"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            type="submit"
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemUpdate;
