import React from "react";
import { PauseIcon } from "@heroicons/react/24/outline";

export default function PauseButton(props) {
  return (
    <span className="flex items-center justify-center p-4 text-white bg-blue-500 rounded-full cursor-pointer  hover:scale-95 transition-all hover:bg-blue-700 duration-200 active:bg-blue-800" {...props}>
      <PauseIcon className="w-6 h-6"/>
      {/* <FontAwesomeIcon icon={faPause} color="#000" /> */}
    </span>
  );
}
