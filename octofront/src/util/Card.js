import React from "react";

const Card = ({ children , className }) => {
  return (
    <div class= {`block h-full rounded-2xl shadow  dark:bg-customGray dark:border-gray-700 ${className} `}>
      {children}
    </div>
  );
};

export default Card;
