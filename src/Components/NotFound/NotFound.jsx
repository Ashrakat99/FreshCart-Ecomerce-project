import React from "react";
import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <img
          src="src\assets\images\notfound.png" 
          alt="Not Found"
          className="mx-auto w-89 h-89 object-fill"
        />
        <h2 className="mt-6 text-2xl font-semibold text-gray-700">
          Oops! Page Not Found
        </h2>
      </div>
    </div>
  );
}
