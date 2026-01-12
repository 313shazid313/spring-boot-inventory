import { Link } from "react-router-dom";
import {
  useReadJobQuery,
  // useDeleteJobMutation,
} from "../redux/rtk/all-requests.js";
import Loading from "../utility/Loading.jsx";
import ErrorPage from "../utility/ErrorPage.jsx";
import { useEffect,  } from "react";

//icons
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

// tooltip
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const JobTable = () => {

  const { data, isError, isLoading, refetch } = useReadJobQuery();

  // const [deleteJob] = useDeleteJobMutation();

  // const handleDelete = async (id) => {
  //   try {
  //     const userConfirmed = confirm("Sure You Want To Delete!");

  //     if (userConfirmed) {
  //       await deleteJob(id);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  console.log(data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
   <div>
      <p className="text-2xl py-4 text-center">Jobs</p>

      <div className="flex justify-between items-center gap-4">
        <Link
          to="job-form"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
          focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
          shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Job +
        </Link>
      </div>

      <br />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-3 py-3">Sl No.</th>
              <th className="px-3 py-3">Job Title</th>
              <th className="px-3 py-3">Employee Name</th>
              <th className="px-3 py-3">Department Name</th>
              <th className="px-3 py-3">Salary</th>
              <th className="px-3 py-3">Created At</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 
                             dark:odd:bg-gray-900 dark:even:bg-gray-800"
                >
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="px-3 py-3">{item?.job_name}</td>
                  <td className="px-3 py-3">{item?.Employee?.name}</td>
                  <td className="px-3 py-3">{item?.Department?.name}</td>
                  <td className="px-3 py-3">{item?.salary}</td>
                  <td className="px-3 py-3">
                    {new Date(item?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3 flex space-x-2">
                    <Link
                      className="flex justify-center"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Edit"
                      to={`job-update/${item.id}`}
                    >
                      <FaEdit className="text-xl text-blue-500" />
                    </Link>
                    {/* <button
                      className="flex justify-center"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdOutlineDelete className="text-xl text-red-500" />
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Tooltip id="my-tooltip" />
      </div>
      <br />
    </div>
  )
}

export default JobTable