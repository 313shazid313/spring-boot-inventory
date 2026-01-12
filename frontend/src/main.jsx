import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux"; // Import Provider from react-redux
import routes from "./routes.jsx";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster position="top-center" reverseOrder={false} />
    <RouterProvider router={routes} />
  </Provider>
);
