import React from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

export default function PlayPauseButton(props) {
  // const icon = props.pause ? faPause : faPlay;
  return (
    <span className="play-button" {...props}>
      { props.pause ? <PauseIcon className="w-6 h-6 mr-2 cursor-pointer hover:text-white" /> : <PlayIcon className="w-6 h-6 mr-2 cursor-pointer hover:text-white" /> }
  
      {/* <FontAwesomeIcon icon={icon} color="#6f4ad2" /> */}
    </span>
  );
}
