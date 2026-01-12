import { Link } from "react-router-dom";
import { useSingleEmployeeQuery } from "../redux/rtk/all-requests";

const Profile = () => {
  const raw = localStorage.getItem("user");

  if (!raw) {
    throw new Error("User data not found in local storage.");
  }

  const data = JSON.parse(raw);
  console.log(data.id);

  const {
    data: fetchedData,
    isLoading,
    isError,
  } = useSingleEmployeeQuery(data.id);

  console.log(fetchedData);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-lg font-medium text-gray-600">
        Loading profile data...
      </div>
    );
  }

  if (isError || !fetchedData) {
    return (
      <div className="p-6 text-center text-lg font-medium text-red-600">
        Error loading profile or employee data not found.
      </div>
    );
  }

  const { name, gender, age, email, address, isAdmin, id } = fetchedData;

  return (
    <div className="max-w-4xl mx-auto p-6  rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Employee Profile
      </h1>

      <div className="space-y-4">
        {/* Profile Card Header */}
        <div className="flex items-center space-x-4 pb-4 border-b">
          {/* A simple placeholder/initials or icon */}
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
            {name ? name.charAt(0) : "U"}
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">
              {isAdmin ? "Administrator" : "Employee"}
            </p>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pt-4">
          {/* Email */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-base text-gray-800">{email}</span>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Gender</span>
            <span className="text-base text-gray-800">{gender}</span>
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Age</span>
            <span className="text-base text-gray-800">{age}</span>
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <span className="text-sm font-medium text-gray-500">Address</span>
            <span className="text-base text-gray-800">{address}</span>
          </div>
        </div>
      </div>

      {/* Action Button (e.g., Edit Profile) */}
      {/* Action Buttons: Standard, practical design */}
      <div className="mt-8 pt-4 border-t flex justify-end space-x-3">
        {/* Secondary Action: Reset Password (Less emphasis/less frequently used) */}
        {/* <Link
          to={`reset-password/${id}`}
          className="px-4 py-2 text-blue-600 border border-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-150"
        >
          Reset Password
        </Link> */}

        {/* Primary Action: Edit Profile (More emphasis/more frequently used) */}
        <Link
          to="edit-profile"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
