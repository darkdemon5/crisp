import { Button, Card, message, Modal, Upload } from "antd";
import Navbar from "../Components/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  resetInterview,
  saveAnswer,
  updateCandidateField,
  updateResume,
} from "../Auth/candidateSlice";
import { ArrowUpOutlined, PlusOutlined } from "@ant-design/icons";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
// import { data } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import mammoth from "mammoth";
import { addBotMessage, addUserMessage } from "../Auth/chatSlice";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Chat = () => {
  const candidate = useSelector((state) => state.candidate);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const missing = candidate.missingFields;
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {

  };

  const handleResumeUpload = async (file) => {
    
  };

  useEffect(() => {
    if (!candidate.interviewCompleted && candidate.timerRemaining > 0) {
      setOpen(true);
    }
  }, [candidate]);

  const handleResume = () => {
    setOpen(false);
  };

  const handleRestart = () => {
    dispatch(resetInterview());
    setOpen(false);
  };

  return (
    <div className="w-full h-screen bg-[#F2F1e6] flex flex-col">
      <Navbar />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="resume" onClick={handleResume}>
            Resume
          </Button>,
          <Button key="restart" danger onClick={handleRestart}>
            Restart
          </Button>,
        ]}
      >
        <p>
          Looks like you have an unfinished interview. Would you like to resume
          where you left off?
        </p>
      </Modal>

      <div className="w-[80%] h-full overflow-y-auto mx-auto flex flex-col justify-end ">
        {/* <Button type="primary" className="bg-[#1677ff]">Upload Resume</Button> */}
        {/* <button className="m-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Upload Resume
      </button> */}

        {/* <Card title="Card title" variant="borderless" style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card> */}

        <div className="w-[60%] h-[6%] mx-auto bg-white rounded-full my-10 border border-gray-200 shadow-lg flex justify-end items-center ">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full rounded-full focus:outline-none focus:border-none ml-2 px-4 text-xl"
            placeholder={isFocused ? "Just Kidding!!!" : "Not Working!!!"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <Button
            type="text"
            shape="circle"
            className="mr-3"
            size="large"
            onClick={handleSubmit}
            icon={<ArrowUpOutlined />}
            style={{ marginRight: 8 }}
          >
            {/* Send */}
          </Button>
          <Upload beforeUpload={handleResumeUpload} showUploadList={false}>
            <Button
              type="text"
              shape="circle"
              className="mr-3"
              size="large"
              // href=""
              icon={<PlusOutlined />}
            />
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default Chat;
