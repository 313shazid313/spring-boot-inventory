import { createBrowserRouter } from "react-router-dom";
import AdminNav from "./AdminNav";
import Employees from "./pages/Employees";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeUpdate from "./pages/EmployeeUpdate";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import ResetPassword from "./pages/ResetPassword";
import LeaveForm from "./pages/LeaveForm";
import LeaveRequestsEmployee from "./pages/LeaveRequestsEmployee";
import LeaveRequestsAdmin from "./pages/LeaveRequestsAdmin";
import JobTable from "./pages/JobTable";
import DepartmentTable from "./pages/DepartmentTable";
import DepartmentForm from "./pages/DepartmentForm";
import DepartmentUpdata from "./pages/DepartmentUpdata";
import JobForm from "./pages/JobForm";
import JobUpdate from "./pages/JobUpdate";
import PayrollTable from "./pages/PayrollTable";
import Charts from "./pages/Charts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <AdminNav />,
    children: [
      { path: "profile", element: <Profile /> },
      { path: "employees", element: <Employees /> },
      {path : "charts", element:<Charts/>},
      { path: "employees/emploree-form", element: <EmployeeForm /> },
      { path: "employees/employee-update/:id", element: <EmployeeUpdate /> },
      { path: "profile/edit-profile", element: <EditProfile /> },
      { path: "profile/reset-password/:id", element: <ResetPassword /> },
      { path: "create-leave", element: <LeaveForm /> },
      { path: "departments", element: <DepartmentTable /> },
      { path: "departments/department-form", element: <DepartmentForm /> },
      {
        path: "departments/department-update/:id",
        element: <DepartmentUpdata />,
      },
      { path: "jobs", element: <JobTable /> },
      { path: "jobs/job-form", element: <JobForm /> },
      { path: "jobs/job-update/:id", element: <JobUpdate /> },

      {
        path: "view-leave-requests-employee",
        element: <LeaveRequestsEmployee />,
      },
      { path: "view-leave-requests-admin", element: <LeaveRequestsAdmin /> },
      {path :"payrolls", element:<PayrollTable/>}
    ],
  },
]);

export default routes;
