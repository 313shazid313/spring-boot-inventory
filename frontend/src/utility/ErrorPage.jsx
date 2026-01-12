
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{background :"#ECEFF1"}} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br text-gray-800 p-6">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-2">
        Something Went Wrong
      </p>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        We're sorry, but an unexpected error has occurred. Please try again
        later or return to the homepage.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        Go to Homepage
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
};

export default ErrorPage;
