import React, { useState, useRef } from "react";
import "./videoRecorder.css";

function RecorderVideo() {
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef = useRef();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const recorder = new MediaRecorder(stream);
    setMediaStream(stream);
    setMediaRecorder(recorder);

    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      videoRef.current.src = url;
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    mediaStream.getTracks().forEach((track) => track.stop());
    setMediaStream(null);
    setMediaRecorder(null);
    setRecording(false);
  };

  return (
    <div className="videoScreenRecorder">
      <span className="screenTitle">Video Recorder</span>
      <video className="videoScreen" ref={videoRef} controls autoPlay muted />
      {!recording ? (
        <button className="startRecordingButtton" onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <button className="stopRecordingButtton" onClick={stopRecording}>
          Stop Recording
        </button>
      )}
    </div>
  );
}

export default RecorderVideo;
