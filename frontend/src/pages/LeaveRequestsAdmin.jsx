import { Link } from "react-router-dom";
import {
  useReadLeaveQuery,
  useApprovedMutation,
  useRejectedMutation,
} from "../redux/rtk/all-requests.js";
import "react-tooltip/dist/react-tooltip.css";

import Loading from "../utility/Loading.jsx";
import ErrorPage from "../utility/ErrorPage.jsx";
import { useEffect } from "react";

//icons
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md"; // Not used in final table but kept for consistency

// tooltip
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to get status badge classes
const getStatusClasses = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'Pending':
    default:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  }
};


const LeaveRequestsAdmin = () => {
  let serial = 0;
  // Use a default array for data to avoid errors during initial rendering before the query completes
  const { data: leaveRequests, isError, isLoading, refetch } = useReadLeaveQuery();
  const [approved] = useApprovedMutation();
  const [rejected] = useRejectedMutation();
  console.log(leaveRequests);

  const handleApprove = async (id) => {
    try {
      const userConfirmed = confirm("Sure You Want To Approve This Leave Request?");

      if (userConfirmed) {
        await approved(id);
    
        refetch(); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const userConfirmed = confirm("Sure You Want To Reject This Leave Request?");

      if (userConfirmed) {
        await rejected(id);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  // Filter out requests where the employee is an admin (based on your existing filter)
  const filteredRequests = leaveRequests?.filter((request) => request.Employee?.isAdmin !== true) || [];


  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold mb-6">Leave Requests</p> {/* Changed title from "Employees" to "Leave Requests" */}
        </div>
        {/* Removed "Add Employee" button as this is a Leave Request view, not an Employee management view. 
            You can keep it if this component is also used for employee management. */}
        <div className="">
          {/* <Link
            to="emploree-form"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Add Employee +
          </Link> */}
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> {/* Added shadow for better table look */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl No.
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
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
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={item.id}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {(serial += 1)}
                  </td>
                  <td className="px-6 py-4">{item?.Employee?.name || 'N/A'}</td>
                  <td className="px-6 py-4">{formatDate(item.date)}</td>
                  <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                    data-tooltip-id={`reason-tooltip-${item.id}`}
                    data-tooltip-content={item.reason}
                    data-tooltip-place="top"
                  >
                    {item.reason}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(item.status)}`}>
                        {item.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    {/* Action buttons: Only show Approve/Reject if the status is not already Approved or Rejected */}
                    {item.status === 'Pending' ? (
                        <div className="flex items-center justify-center space-x-2">
                            {/* Approve Button */}
                            <button
                                className="font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg text-xs px-3 py-1 transition-colors"
                                data-tooltip-id="action-tooltip"
                                data-tooltip-content="Approve Request"
                                onClick={() => {
                                    handleApprove(item.id);
                                }}
                                aria-label={`Approve leave request for ${item?.Employee?.name || item.id}`}
                            >
                                Approve
                            </button>

                            {/* Reject Button */}
                            <button
                                className="font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg text-xs px-3 py-1 transition-colors"
                                data-tooltip-id="action-tooltip"
                                data-tooltip-content="Reject Request"
                                onClick={() => {
                                    handleReject(item.id);
                                }}
                                aria-label={`Reject leave request for ${item?.Employee?.name || item.id}`}
                            >
                                Reject
                            </button>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            No Action Needed
                        </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Tooltip for the reason column (using a unique ID for each) */}
        {filteredRequests.map(item => (
            <Tooltip key={`reason-tooltip-${item.id}`} id={`reason-tooltip-${item.id}`} />
        ))}
        {/* General Tooltip for action buttons */}
        <Tooltip id="action-tooltip" />
      </div>
    </div>
  );
};

export default LeaveRequestsAdmin;