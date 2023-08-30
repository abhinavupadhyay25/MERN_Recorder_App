import React, { useState } from "react";
import "./screenRecorder.css";

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recorded-screen.webm";
        a.click();
        URL.revokeObjectURL(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      window.location.reload();
    }
  };

  return (
    <div className="screenRecorder">
      <span className="screenTitle">Screen Recorder</span>
      {recording ? (
        <button className="stopRecordingButtton" onClick={stopRecording}>
          Stop Recording
        </button>
      ) : (
        <button className="startRecordingButtton" onClick={startRecording}>
          Start Recording
        </button>
      )}
    </div>
  );
};

export default ScreenRecorder;
