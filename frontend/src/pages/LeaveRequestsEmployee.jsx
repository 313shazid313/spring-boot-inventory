import {
  useAllLeaveWilhSpecficIdQuery,
  useDeleteLeaveMutation,
} from "../redux/rtk/all-requests.js";

import Loading from "../utility/Loading.jsx";
import ErrorPage from "../utility/ErrorPage.jsx";
import { useEffect } from "react";

import { MdOutlineDelete } from "react-icons/md";
// Helper function to format the date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to get status badge classes
const getStatusClasses = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "Pending":
    default:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  }
};

const LeaveRequestsEmployee = () => {
  let serial = 0;
  const raw = localStorage.getItem("user");

  const [deleteLeave] = useDeleteLeaveMutation();

  if (!raw) {
    return <ErrorPage message="Authentication required. Please log in." />;
  }

  const userData = JSON.parse(raw);
  const employeeId = userData.id;

  const {
    data: leaveRequests,
    isError,
    isLoading,
    refetch,
  } = useAllLeaveWilhSpecficIdQuery(employeeId);

  console.log(leaveRequests);

  const handleDelete = async (id) => {
    try {
      const userConfirmed = confirm(
        "Sure You Want To Reject This Leave Request?"
      );

      if (userConfirmed) {
        await deleteLeave(id);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Refetch data when the component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  const requests = leaveRequests || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">My Leave Requests</p>
        {/* You can add a button/link here to navigate to a new leave request form */}
        {/* <Link to="/apply-leave" className="... style for a button ...">Apply for Leave +</Link> */}
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl No.
              </th>
              <th scope="col" className="px-6 py-3">
                Date Requested
              </th>
              <th scope="col" className="px-6 py-3">
                Reason
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={item.id}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {(serial += 1)}
                  </td>
                  <td className="px-6 py-4">{formatDate(item.date)}</td>
                  <td className="px-6 py-4">{item.reason}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                                 <td className="px-6 py-4">
                    {/* Container for the action buttons: use flex to arrange them horizontally */}
                    <div className="flex items-center space-x-4">


                      {/* 2. Delete Button (Action) */}
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Delete Employee" // Corrected tooltip content
                        data-tooltip-place="top"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        aria-label={`Delete employee ${item.name || item.id}`} // Added for accessibility
                      >
                        <MdOutlineDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  You have not submitted any leave requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequestsEmployee;
