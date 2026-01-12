import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../redux/rtk/all-requests";
import toast from "react-hot-toast";
import Loading from "../utility/Loading";
import ErrorPage from "../utility/ErrorPage";

const EmployeeUpdate = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // Corrected: single employee query
  const {
    data,
    isLoading: isEmployeeLoading,
    error,
  } = useSingleEmployeeQuery(id);

  // Corrected: employee update mutation
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const [element, setElement] = useState({
    name: "",
    gender: "",
    age: "",
    password: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (data) {
      setElement({
        name: data?.name || "",
        gender: data?.gender || "",
        age: data?.age || "",
        password: data?.password,
        email: data?.email || "",
        address: data?.address || "",
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
      console.log(element)
      await updateEmployee({ id, ...element }).unwrap();
      toast.success("Employee updated successfully!");
      navigate("/dashboard/employees"); // redirect to employee list (or wherever)
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employee");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isEmployeeLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div>
      <div>
        <p className="text-2xl font-bold mb-6 text-center">Update Employee</p>
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

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Gender *
              </label>
              <div className="mt-2">
                <select
                  name="gender"
                  value={element.gender}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                >
                  <option value="">--- Select Gender ---</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  name="age"
                  type="number"
                  value={element.age}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password *
              </label>
              <div className="mt-2 relative">
                {" "}
                {/* Added 'relative' for positioning the button */}
                <input
                  id="password" // Added an ID for the label to be correctly associated
                  name="password"
                  // Conditional type: 'text' if showPassword is true, otherwise 'password'
                  type={showPassword ? "text" : "password"}
                  value={element.password}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border py-1.5 px-2 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                  // Added 'pr-10' (padding-right) to ensure text doesn't go under the button
                />
                {/* The Eye Button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  // Absolute positioning to place the button inside the input area
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5 text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {/* You should replace this with a proper icon (e.g., from Heroicons, Font Awesome, etc.)
            For example, you'd use an <EyeIcon /> component or similar here.
          */}
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
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

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <textarea
                  name="address"
                  value={element.address}
                  onChange={handleInputChange}
                  rows="3"
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

export default EmployeeUpdate;
