import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { PiPhoneSlashFill } from "react-icons/pi";
import { MdPhone } from "react-icons/md";
import { IoMicSharp, IoMicOffSharp } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./VideoChat.css";
import { useSelector } from "react-redux";
import {
  useFetchDoctorsQuery,
  useFetchDoctorQuery,
  useFetchPatientQuery,
  useFetchPatientsQuery,
} from "../../../store";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { useParams } from "react-router-dom";
import { set } from "date-fns";

const socket = io.connect("http://localhost:5000");
function VideoChat() {
  const user = useSelector((state) => state.user);
  // console.log(user);
  const {
    data: patientData,
    isFetching: patientIsFetching,
    error: patientError,
  } = useFetchPatientQuery();
  const {
    data: doctorsData,
    isFetching: doctorsIsFetching,
    error: doctorsError,
  } = useFetchDoctorsQuery();
  const {
    data: doctorData,
    isFetching: doctorIsFetching,
    error: doctorError,
  } = useFetchDoctorQuery();

  const {
    data: patientsData,
    isFetching: patientsIsFetching,
    error: patientsError,
  } = useFetchPatientsQuery();

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [callerName, setCallerName] = useState("");
  const [roomId, setRoomId] = useState("123");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const [isMuted, setIsMuted] = useState(true);
  const [cameraOff, setCameraOff] = useState(true);

  const { id, idx } = useParams();

  const toggleMute = () => {
    if (stream) {
      const enabled = stream.getAudioTracks()[0].enabled;
      stream.getAudioTracks()[0].enabled = !enabled;
      setIsMuted(!enabled);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const enabled = stream.getVideoTracks()[0].enabled;
      stream.getVideoTracks()[0].enabled = !enabled;
      setCameraOff(!enabled);
    }
  };

  useEffect(() => {
    if (patientIsFetching || doctorsIsFetching || doctorIsFetching || patientsIsFetching) return;
    if (user.userRoleClinic === "patient") {
      setMe(patientData._id);
      setName(patientData.name);
      setCallerName(doctorsData[id].name);
      setIdToCall(doctorsData[id]._id);
      setRoomId(patientData._id + doctorsData[id]._id);
    } else {
      setMe(doctorData._id);
      setName(doctorData.name);
      setCallerName(patientsData[idx].name);
      setIdToCall(patientsData[idx]._id);
      setRoomId(patientsData[idx]._id + doctorData._id);
    }
  }, [patientIsFetching, doctorsIsFetching, doctorIsFetching, patientsIsFetching]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      // console.log(myVideo.current);
      // console.log(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    });
    socket.emit("join_room_video", { room: roomId });

    socket.on("receiveCall", (data) => {
      console.log("receive call fe");
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.on("othersCallEnded", () => {
      closeCall();
    });
  }, [roomId]);

  const callUser = () => {
    setCallEnded(false);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log("call user emit frontend");

      socket.emit("callUser", {
        room: roomId,
        signalData: data,
        from: me,
      });
      // if (peer.signalingState === "have-local-offer") {
      //   peer.setRemoteDescription(new RTCSessionDescription(data));
      // }
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallEnded(false);
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log("answer call data");
      console.log(data);
      console.log("answer call caller");
      console.log(caller);

      socket.emit("answerCall", { room: roomId, signal: data, to: caller });
      // if (peer.signalingState === "have-local-offer") {
      //   peer.setRemoteDescription(new RTCSessionDescription(data));
      // }
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
  const closeCall = () => {
    setCallEnded(true);
    setReceivingCall(false);
    setCallAccepted(false);
    setCallerSignal();
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    // connectionRef.current = null;
    window.location.reload();
  };
  const leaveCall = () => {
    // socket.emit("callEnded");
    socket.emit("callEnded");
    closeCall();
    // socket.disconnect();
  };
  if (patientIsFetching || doctorsIsFetching || doctorIsFetching || patientsIsFetching)
    return <LoadingIndicator />;
  // if (patientError || doctorsError || doctorError || patientsError) {
  //   //console.log(patientData, doctorsData);
  //   return <div>Something went wrong</div>;
  // }

  return (
    <div className="video-chat-container">
      <h1 className="video-caller">Calling {callerName}</h1>
      <div className="video-call-div">
        <div className="my-video">
          <video
            className="video-player"
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: "300px" }}
          />
        </div>
        <div className="other-video">
          {callAccepted && !callEnded ? (
            <video
              className="video-player"
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: "100%" }}
            />
          ) : (
            <div className="no-call-placeholder">Calling ...</div>
          )}
        </div>
      </div>
      <div className="video-chat-button-terminal">
        <button className="video-chat-button blue-video-button" onClick={toggleMute}>
          {isMuted ? <IoMicSharp size={40} /> : <IoMicOffSharp size={40} />}
        </button>
        {callAccepted && !callEnded ? (
          <button className="video-chat-button red-video-button" onClick={leaveCall}>
            <PiPhoneSlashFill size={40} />
          </button>
        ) : (
          <button className="video-chat-button green-video-button" onClick={callUser}>
            <MdPhone size={40} />
          </button>
        )}

        <button className="video-chat-button blue-video-button" onClick={toggleCamera}>
          {cameraOff ? <BsFillCameraVideoFill size={40} /> : <BsFillCameraVideoOffFill size={40} />}
        </button>
      </div>
    </div>
  );
}

export default VideoChat;
