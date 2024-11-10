import React from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <div className={`block h-full rounded-2xl shadow dark:bg-customGray dark:border-gray-700 cursor-pointer
      hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out
      hover:bg-opacity-90 active:scale-95 ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;