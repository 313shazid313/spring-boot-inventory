import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateEmployeeMutation } from "../redux/rtk/all-requests";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const [element, setElement] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    const requiredFields = ["firstName", "lastName", "email"];
    const missingFields = requiredFields.filter((field) => !element[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    try {
      await createEmployee(element).unwrap();
      toast.success("New Supplier Created Successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message || "Please fill the fields correctly");
    }
  };

  return (
    <div>
      <div>
        <p className="text-2xl font-bold mb-6 text-center">Add New Employee</p>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                First Name *
              </label>
              <div className="mt-2">
                <input
                  name="firstName"
                  type="text"
                  value={element.firstName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  name="lastName"
                  type="text"
                  value={element.lastName}
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

export default EmployeeForm;
