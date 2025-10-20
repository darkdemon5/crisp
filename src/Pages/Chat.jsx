import { Button, Card, message, Modal, Upload } from "antd";
import Navbar from "../Components/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // nextQuestion,
  resetInterview,
  updateCandidateField,
  updateResume,
  // saveAnswer,
  // updateCandidateField,
  // updateResume,
} from "../Auth/candidateSlice";
import { ArrowUpOutlined, PlusOutlined } from "@ant-design/icons";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
// import { data } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import mammoth from "mammoth";
import { addBotMessage } from "../Auth/chatSlice";
// import { addBotMessage, addUserMessage } from "../Auth/chatSlice";
// import { data } from "react-router-dom";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Chat = () => {
  const candidate = useSelector((state) => state.candidate);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  // const missing = candidate.missingFields;
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = () => {};

  const handleResumeUpload = async (file) => {
    // console.log("Uploaded file:", file);
    let missingFields;
    const extractInfo = async (text) => {
      // console.log("Extracting info from text:", text);
      // Email regex pattern
      const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g;
      // Phone regex pattern (handles various formats)
      const phonePattern =
        /(?:\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g;
      // Name pattern (looks for 2-3 consecutive capitalized words)
      const namePattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}\b/;

      const emails = text.match(emailPattern) || [];
      const phones = text.match(phonePattern) || [];
      const names = text.match(namePattern) || [];

      return {
        email: emails[0] || "",
        phone: phones[0] || "",
        name: names[0] || "",
      };
    };

    const validateInfo = (info) => {
      const missing = [];
      if (!info.name) missing.push("name");
      if (!info.email) missing.push("email");
      if (!info.phone) missing.push("phone");
      return missing;
    };

    try {
      let text = "";
      let attempts = 0;
      const maxAttempts = 3;
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        // console.log("Array buffer obtained from PDF file.", arrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        // console.log("PDF document loaded.", pdf);
        const page = await pdf.getPage(1);
        // console.log("PDF page retrieved.", page);
        const content = await page.getTextContent();
        // console.log("Text content extracted from PDF page.", content);
        text = content.items.map((items) => items.str).join(" ");
        // console.log("Extracted text from PDF:", text);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        message.error("Please upload a PDF or DOCX file");
        return false;
      }

      while (attempts < maxAttempts) {
        // console.log(`Attempt ${attempts + 1} to extract information.`);
        const info = await extractInfo(text);
        // console.log("info", info);
        missingFields = validateInfo(info);
        console.log("missing field", missingFields.length === 0);

        if (missingFields.length === 0) {
          dispatch(updateCandidateField({ field: "name", value: info.name }));
          console.log("name", info.name);
          dispatch(updateCandidateField({ field: "email", value: info.email }));
          console.log("email", info.email);
          dispatch(updateCandidateField({ field: "phone", value: info.phone }));
          console.log("phone", info.phone);
          dispatch(
            updateResume({
              parsedFields: {
                name: info.name || "",
                email: info.email || "",
                phone: info.phone || "",
              },
              text, // optional: include resume text if you need it
            })
          );
          dispatch(
            addBotMessage(
              "Resume parsed successfully! Starting your interview..."
            )
          );
          message.success("Resume parsed successfully!");
          return true;
        }
        attempts++;
      }

      if (missingFields.length > 0) {
                dispatch(
          updateResume({
            parsedFields: {
                name: info.name || "",
                email: info.email || "",
                phone: info.phone || "",
              },
            text,
          })
        );
        dispatch(
          addBotMessage(
            `Could not extract all information. Missing fields: ${missingFields.join(
              ", "
            )}. Please provide them.`
          )
        );
        message.warning(
          "Could not extract all information from the resume. Please provide missing details."
        );
        return false;
      }
    } catch (error) {
      console.log("Error processing resume:", error);
      message.error("Error processing resume. Please try again.");
      return false;
    }
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

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-4">Edit Your Information</h2>
          <input
            type="text"
            defaultValue={candidate.name}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
            onBlur={(e) =>
              dispatch(updateCandidateField({ field: "name", value: e.target.value }))
            }
          />
          <input
            type="email"
            defaultValue={candidate.email}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            onBlur={(e) =>
              dispatch(updateCandidateField({ field: "email", value: e.target.value }))
            }
          />
          <input
            type="tel"
            defaultValue={candidate.phone}
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded"
            onBlur={(e) =>
              dispatch(updateCandidateField({ field: "phone", value: e.target.value }))
            }
          />
          <Button
            type="primary"
            onClick={() => setOpenEdit(false)}
            className="mt-4"
          >
            Save
          </Button>
        </div>
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

        <div className="w-[55%] h-full mx-auto flex justify-start items-end">
          <Card
            title="Is this your information?"
            variant="borderless"
            style={{ width: 300 }}
            className="border-gray-200 shadow-xl"
          >
            <p>
              <b>Name:</b> {candidate.name || "Not provided"}
            </p>
            <p>
              <b>Email:</b> {candidate.email || "Not provided"}
            </p>
            <p>
              <b>Phone:</b> {candidate.phone || "Not provided"}
            </p>
            <p className="w-full flex justify-between mt-4"> 
              <Button variant="filled" color="default" onClick={() => setOpenEdit(false)} size="large" style={{width: '40%' }}>Yes</Button>
              <Button variant="filled" color="default" onClick={() => setOpenEdit(true)} size="large" style={{width: '40%' }}>No</Button>
            </p>
          </Card>
        </div>

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
