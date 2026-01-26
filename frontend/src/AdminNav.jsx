import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { logout } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// React Icons
import {
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
                className="flex items-center p-2"
              >
                <FiUsers className="text-lg" />
                <span className="ms-3">Employees</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/category-list"
                className="flex items-center p-2"
              >
                <FiGrid className="text-lg" />
                <span className="ms-3">Categories</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/items-list"
                className="flex items-center p-2"
              >
                <FiClipboard className="text-lg" />
                <span className="ms-3">Items</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/suppliers"
                className="flex items-center p-2"
              >
                <FiBriefcase className="text-lg" />
                <span className="ms-3">Suppliers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/customers"
                className="flex items-center p-2"
              >
                <FiBriefcase className="text-lg" />
                <span className="ms-3">Customers</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/make-purchase"
                className="flex items-center p-2"
              >
                <FiPlusCircle className="text-lg" />
                <span className="ms-3">Make Purchase</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/get-purchases"
                className="flex items-center p-2"
              >
                <FiList className="text-lg" />
                <span className="ms-3">Purchases List</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/make-sale"
                className="flex items-center p-2"
              >
                <FiDollarSign className="text-lg" />
                <span className="ms-3">Make Sale</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/get-sales"
                className="flex items-center p-2"
              >
                <FiBarChart2 className="text-lg" />
                <span className="ms-3">Sales List</span>
              </NavLink>
            </li>

            <li>
              <button onClick={handleLogout} className="flex items-center p-2">
                <FiLogOut className="text-xl" />
                <span className="ms-3">Logout</span>
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
