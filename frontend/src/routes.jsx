import { createBrowserRouter } from "react-router-dom";
import AdminNav from "./AdminNav";
import Employees from "./pages/Employees";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeUpdate from "./pages/EmployeeUpdate";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

import ResetPassword from "./pages/ResetPassword";
// import Charts from "./pages/Charts";
import CategoryList from "./pages/category/CategoryList";
import CategoryForm from "./pages/category/CategoryForm";
import CategoryUpdate from "./pages/category/CategoryUpdate";
import ItemsList from "./pages/items/ItemsList";
import ItemForm from "./pages/items/ItemForm";
import ItemUpdate from "./pages/items/ItemUpdate";

import SupplierList from "./pages/suppliers/SupplierList";
import SupplierForm from "./pages/suppliers/SupplierForm";
import SupplierUpdate from "./pages/suppliers/SupplierUpdate";

import CustomersList from "./pages/customers/CustomersList";
import CustomerForm from "./pages/customers/CustomerForm";
import CustomersUpdate from "./pages/customers/CustomersUpdate";

import PurchaseList from "./pages/purchase/PurchaseList";
import Makepurchase from "./pages/purchase/Makepurchase";
import MakeSell from "./pages/sale/MakeSell";
import SaleList from "./pages/sale/SaleList";
import ViewSell from "./pages/sale/ViewSell";

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
      { path: "category-list", element: <CategoryList /> },
      { path: "category-list/category-form", element: <CategoryForm /> },
      {
        path: "category-list/category-update/:id",
        element: <CategoryUpdate />,
      },
      { path: "items-list", element: <ItemsList /> },
      { path: "items-list/item-form", element: <ItemForm /> },
      { path: "items-list/item-update/:id", element: <ItemUpdate /> },

      // { path: "charts", element: <Charts /> },
      { path: "employees/emploree-form", element: <EmployeeForm /> },
      { path: "employees/employee-update/:id", element: <EmployeeUpdate /> },
      { path: "profile/reset-password/:id", element: <ResetPassword /> },

      { path: "suppliers", element: <SupplierList /> },
      { path: "suppliers/supplier-form", element: <SupplierForm /> },
      { path: "suppliers/supplier-update/:id", element: <SupplierUpdate /> },

      { path: "customers", element: <CustomersList /> },
      { path: "customers/customer-form", element: <CustomerForm /> },
      { path: "customers/customer-update/:id", element: <CustomersUpdate /> },

      { path: "make-purchase", element: <Makepurchase /> },
      { path: "get-purchases", element: <PurchaseList /> },

      { path: "make-sale", element: <MakeSell /> },
      { path: "get-sales", element: <SaleList /> },
      { path: "get-sales/sale/:id", element: <ViewSell /> },
    ],
  },
]);

export default routes;
