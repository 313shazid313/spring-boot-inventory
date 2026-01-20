import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  useSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/rtk/all-requests";

import Loading from "../../utility/Loading";
import ErrorPage from "../../utility/ErrorPage";

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch single category
  const {
    data,
    isLoading: isCategoryLoading,
    error,
  } = useSingleCategoryQuery(id);

  // Update category mutation
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  // Form state
  const [element, setElement] = useState({
    name: "",
    description: "",
  });

  // Populate form when data arrives
  useEffect(() => {
    if (data) {
      setElement({
        name: data?.name || "",
        description: data?.description || "",
      });
    }
  }, [data]);

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
      await updateCategory({ id, ...element }).unwrap();
      toast.success("Category updated successfully!");
      navigate("/dashboard/category-list");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category");
    }
  };

  if (isCategoryLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center">Update Category</p>

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
                required
                value={element.name}
                onChange={handleInputChange}
                className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <input
                name="description"
                type="text"
                value={element.description}
                onChange={handleInputChange}
                className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
              />
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

export default CategoryUpdate;
