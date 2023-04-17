import React, { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const Alert = ({ message, description, onDismiss, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
    return;
  }, [message, duration]);

  return (
    <div className={`fixed top-0 right-0 p-4 ${
             isVisible ? "opacity-100" : "opacity-0"
         } transition-all duration-300`}>
      <div
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div
          role="alert"
          className="bg-white rounded-xl border border-gray-100 p-4 shadow-xl"
        >
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />

            <div className="flex-1">
              <strong className="block font-medium text-gray-900">
                {" "}
                {message}{" "}
              </strong>

              <p className="mt-1 text-sm text-gray-700"> {description} </p>
            </div>

            <button
              className="text-gray-500 transition hover:text-gray-600"
              onClick={() => setIsVisible(!isVisible)}
            >
              <span className="sr-only">Dismiss popup</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
