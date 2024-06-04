import React from "react";

export default function BoxHeaderDetails(props) {
  const { status, timeSpent, totalTime } = props;
  const totalTimeString = totalTime;
  return (
    <div class="box__details">
      {/* <span class="text-gray-400 text-md">{status}</span> */}
      <div class="flex items-center text-lg font-medium">
        <span class="mr-1 font-bold">{timeSpent}</span>
        <span class="text-gray-400">/ {totalTime}</span>
      </div>
    </div>
  );
}
