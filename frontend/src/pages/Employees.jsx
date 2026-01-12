import { Link } from "react-router-dom";
import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "../redux/rtk/all-requests.js";
import Loading from "../utility/Loading.jsx";
import ErrorPage from "../utility/ErrorPage.jsx";
import { useEffect } from "react";

//icons
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

// tooltip
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Employees = () => {
  const { data, isError, isLoading, refetch } = useGetEmployeesQuery();

  // ?search utility -----------

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
    <div>
      <p className="text-2xl py-4 text-center">Suppliers</p>
      <div className="flex justify-between items-center gap-4">
        {/* Add Button */}
        <Link
          to="emploree-form"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Supplier +
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
                  First Name
                </th>
                <th scope="col" className="px-3 py-3">
                  Last Name
                </th>

                <th scope="col" className="px-3 py-3">
                  Email
                </th>

                <th scope="col" className="px-3 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="px-3 py-3">{item?.firstName}</td>
                  <td className="px-3 py-3">{item?.lastName}</td>
                  <td className="px-3 py-3">{item?.email}</td>

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
  );
};

export default Employees;
