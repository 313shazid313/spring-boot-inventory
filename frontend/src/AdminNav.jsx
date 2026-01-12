import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { logout } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// React Icons
import {
  FiUser,
  FiUsers,
  FiBriefcase,
  FiGrid,
  FiClipboard,
  FiPlusCircle,
  FiList,
  FiDollarSign,
  FiLogOut,
  FiBarChart2,
} from "react-icons/fi";

const AdminNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const raw = localStorage.getItem("user");
  const data = JSON.parse(raw);
  console.log("User Data:", data);

  const handleLogout = async () => {
    try {
      if (confirm("Sure You want to Logout ?")) {
        dispatch(logout());
        navigate("/");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link
            to="/dashboard/profile"
            className="flex items-center ps-2.5 mb-5"
          >
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {data?.isAdmin ? "Admin Dashboard" : "Inventory"}
            </span>
          </Link>

          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/dashboard/employees"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FiUser className="text-lg" />
                <span className="flex-1 ms-3 whitespace-nowrap">Suppliers</span>
              </NavLink>
            </li>

            {data?.isAdmin && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/charts"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiBarChart2 className="text-lg" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Charts
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/employees"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiUsers className="text-lg" />
                    <span className="ms-3">Employees</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/departments"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiGrid className="text-lg" />
                    <span className="ms-3">Departments</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/jobs"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiBriefcase className="text-lg" />
                    <span className="ms-3">Jobs of Employee</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/view-leave-requests-admin"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiClipboard className="text-lg" />
                    <span className="ms-3">Leave Requests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/payrolls"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiDollarSign className="text-lg" />
                    <span className="ms-3">Payrolls</span>
                  </NavLink>
                </li>
              </>
            )}

            {!data?.isAdmin && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/create-leave"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiPlusCircle className="text-lg" />
                    <span className="ms-3">Make Leave Request</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/view-leave-requests-employee"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiList className="text-lg" />
                    <span className="ms-3">My Leave Requests</span>
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <FiLogOut className="text-xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default AdminNav;
