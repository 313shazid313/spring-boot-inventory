import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
} from "../../redux/rtk/all-requests";
import toast from "react-hot-toast";
import Loading from "../../utility/Loading";
import ErrorPage from "../../utility/ErrorPage";

const SupplierUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Corrected: single employee query
  const {
    data,
    isLoading: isEmployeeLoading,
    error,
  } = useGetSingleSupplierQuery(id);

  // Corrected: employee update mutation
  const [updateSupplier, { isLoading }] = useUpdateSupplierMutation();

  const [element, setElement] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (data) {
      setElement({
        name: data?.name || "",
        phoneNumber: data?.phoneNumber || "",
        email: data?.email || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(element);
      await updateSupplier({ id, ...element }).unwrap();
      toast.success("Supplier updated successfully!");
      navigate("/dashboard/suppliers"); // redirect to supplier list (or wherever)
    } catch (err) {
      console.error(err);
      toast.error("Failed to update supplier");
    }
  };

  if (isEmployeeLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div>
      <div>
        <p className="text-2xl font-bold mb-6 text-center">Add New Supplier</p>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                First Name *
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  value={element.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Phone Number *
              </label>
              <div className="mt-2">
                <input
                  name="phoneNumber"
                  type="text"
                  value={element.phoneNumber}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email *
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  value={element.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
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
    </div>
  );
};

export default SupplierUpdate;
