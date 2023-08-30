import ScreenRecorder from "../../components/recorders/screenRecorder/ScreenRecorder";
import RecorderVideo from "../../components/recorders/videoRecorder/VideoRecorder";
import Topbar from "../../components/topbar/Topbar";
import "./homepage.css";

export default function Homepage() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="homeWrapper">
          <div className="homeLeft">
            <RecorderVideo />
          </div>
          <div className="homeRight">
            <ScreenRecorder />
          </div>
        </div>
      </div>
    </>
  );
}
