import React from "react";
export function Alert({
  message = "",
  textColor = "",
  bgColor = "",
  top = "-top-15",
}) {
  return (
    <div
      className={`absolute ${top} left-1/2 -translate-x-1/2 rounded-lg w-96 p-4 font-medium text-center transition-all duration-300 ease ${textColor} ${bgColor}`}
    >
      {message}
    </div>
  );
}
