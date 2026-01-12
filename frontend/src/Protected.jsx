import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const Protected = ({ children }) => {
  const location = useLocation();
  // const isAuthenticated = localStorage.getItem("user"); // Check if user is logged in

  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // if (user) {
  //   return <Navigate to="/dashboard" state={{ from: location }} replace />;
  // }

  return children;
};

export default Protected;
