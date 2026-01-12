import { Link } from "react-router-dom";
import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  // useSearchEmployeeQuery,
} from "../redux/rtk/all-requests.js";
import Loading from "../utility/Loading.jsx";
import ErrorPage from "../utility/ErrorPage.jsx";
import { useEffect, useState } from "react";

//icons
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

// tooltip
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Employees = () => {
  const [genderFilter, setGenderFilter] = useState("");
  const { data, isError, isLoading, refetch } = useGetEmployeesQuery();

  // ?search utility -----------
  const [searchQuery, setSearchQuery] = useState("");
  // const { data: searchData } = useSearchEmployeeQuery(searchQuery);

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleDelete = async (id) => {
    try {
      const userConfirmed = confirm("Sure You Want To Delete!");

      if (userConfirmed) {
        await deleteEmployee(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <>
      {searchQuery == [] ? (
        <div>
          <p className="text-2xl py-4 text-center">Employees</p>
          <div className="flex justify-between items-center gap-4">
            {/* Search bar */}
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search with name..."
                  required
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Gender filter */}
            <div>
              <select
                className="border border-gray-300 rounded-lg py-2 px-3 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Add Button */}
            <Link
              to="emploree-form"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Employee +
            </Link>
          </div>
          <br />
          <div>
            {/* table  */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-3 py-3">
                      Sl No.
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Age
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Created At
                    </th>

                    <th scope="col" className="px-3 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data
                    ?.filter((item) => item.isAdmin !== true)
                    .filter((item) =>
                      genderFilter ? item.gender === genderFilter : true
                    )
                    .filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <td className="px-3 py-3">{index + 1}</td>
                        <td className="px-3 py-3">{item?.name}</td>
                        <td className="px-3 py-3">{item?.gender}</td>
                        <td className="px-3 py-3">{item?.age}</td>
                        <td className="px-3 py-3">{item?.email}</td>
                        <td className="px-3 py-3">{item?.address}</td>
                        <td className="px-3 py-3">
                          {new Date(item?.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-3 py-3 flex space-x-2">
                          <div className="flex flex-row">
                            <Link
                              className="flex justify-center"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Edit"
                              data-tooltip-place="top"
                              to={`employee-update/${item.id}`}
                            >
                              <FaEdit className="text-xl text-blue-500" />
                            </Link>
                            <button
                              className="flex justify-center"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Delete"
                              data-tooltip-place="top"
                              onClick={() => handleDelete(item.id)}
                            >
                              <MdOutlineDelete className="text-xl text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Tooltip id="my-tooltip" />
            </div>
            <br />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-2xl py-4 text-center">Searched Employees</p>

          <div className="flex justify-between items-center gap-4">
            {/* Search bar */}
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search with name..."
                  required
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Gender filter */}
            <div>
              <select
                className="border border-gray-300 rounded-lg py-2 px-3 bg-gray-50 text-gray-900 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Add Button */}
            <Link
              to="employee-form"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Employee +
            </Link>
          </div>
          <br />
          <div>
            {/* table  */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-3 py-3">
                      Sl No.
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Age
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Updated At
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data
                    ?.filter((item) => item.isAdmin !== true)
                    .filter((item) =>
                      genderFilter ? item.gender === genderFilter : true
                    )
                    .filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <td className="px-3 py-3">{index + 1}</td>
                        <td className="px-3 py-3">{item?.name}</td>
                        <td className="px-3 py-3">{item?.gender}</td>
                        <td className="px-3 py-3">{item?.age}</td>
                        <td className="px-3 py-3">{item?.email}</td>
                        <td className="px-3 py-3">{item?.address}</td>
                        <td className="px-3 py-3">
                          {new Date(item?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-3">
                          {new Date(item?.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-3 flex space-x-2">
                          <div className="flex flex-row">
                            <Link
                              className="flex justify-center"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Edit"
                              data-tooltip-place="top"
                              to={`employee-update/${item.id}`}
                            >
                              <FaEdit className="text-xl text-blue-500" />
                            </Link>
                            <button
                              className="flex justify-center"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Delete"
                              data-tooltip-place="top"
                              onClick={() => handleDelete(item.id)}
                            >
                              <MdOutlineDelete className="text-xl text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Tooltip id="my-tooltip" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Employees;
