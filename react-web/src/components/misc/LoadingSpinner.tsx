import React from "react";

function LoadingSpinner({isLoading}) {
  const logo = "https://i-static.techmo.global/uploads/techmo-small2.svg";
  return (
    <div
      className={`loading-overlay ${
        isLoading ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500 absolute inset-0 flex justify-center items-center`}
    >
      <div className="fixed inset-0 bg-white flex items-center justify-center h-screen select-none pointer-events-none ">
        <div className="w-28 h-28 relative">
          <div className="absolute top-0 right-0 bottom-0 left-0 border-4 border-gray-300 rounded-full animate-spinner-gray"></div>
          <div className="absolute top-0 right-0 bottom-0 left-0 border-4 border-teal-500 rounded-full animate-spinner-teal"></div>
          <img src={logo} className="h-16 w-16 mx-auto my-6 " alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
