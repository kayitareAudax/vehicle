import React from "react";

const CustomButton = ({ handleSubmit, bg, text }) => {
  return (
    <button onClick={handleSubmit} className="bg-mainColor hover:bg-red-like text-white font-bold py-2 w-full  rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
      {text}
    </button>
  );
};

export default CustomButton;
