import React from "react";
import PauseButton from "./PauseButton";
// import BoxButton from "./BoxButton";
import { Button } from "~/components/ui/button"

export default function BoxHeaderActions(props) {
  const { stillRecording, stopRecording, hasRecording, recording } = props;
  return (
    <div className="mt-5 box__actions">
      {stillRecording ? <PauseButton onClick={stopRecording} /> : null}
      {/* <Button onClick={() => {
          if (hasRecording) console.log(recording);
        }}
      >Send</Button> */}
    </div>
  );
}
