import { useState, useRef } from "react";
import logo from "./assets/logo.png";
import axios from "axios";
import bg from "./assets/bg.png";

import "./App.css";
const API_URL = "https://emaillistserver-1-q7726733.deta.app/upload";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [fieldsOfInterest, setFieldsOfInterest] = useState("");
  const [remoteInternshipInterest, setRemoteInternshipInterest] = useState("");

  const handleFileSelect = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    // Create form data object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("grade", grade);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("resume", selectedFiles[i]);
    }
    formData.append("FOI", fieldsOfInterest);
    formData.append("RII", remoteInternshipInterest);

    // Send form data to server
    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Form submission successful!");
      })
      .catch((error) => {
        console.error("There was an error submitting the form:", error);
      });
  };

  const ref = useRef(null);
  return (
    <div className="container">
      <img className="logo1" src={logo} />
      <img className="bg-image" src={bg} />
      <h1 className="title">End to End AI Based Personalized Cold-Emailing</h1>
      <div
        className="button"
        onClick={() => ref.current?.scrollIntoView({ behavior: "smooth" })}
      >
        Register at No Cost
      </div>
      <h1 className="offer">What We Offer</h1>
      <p className="offer-description">
        We offer comprehensive end-to-end internship placement services for high
        school students. Our services include conducting research on labs,
        managing multiple spreadsheets to track professor emails, and handling
        other logistical aspects with the help of AI automation. Our
        cutting-edge technology empowers students to efficiently connect with
        college professors and pursue educational opportunities in their field
        of interest. With our assistance, students can establish meaningful
        connections and gain valuable experience. Our mission is to equip the
        next generation of learners and leaders with the necessary tools for
        success. Join us as we revolutionize the way students connect with
        opportunities.
      </p>
      <h1 ref={ref} className="offer">
        Registration
      </h1>
      <p className="offer-description">
        First 10 Personalized Emails Free, each 10 emails after $1 each
      </p>
      <div>
        <h2 className="label">Full Name*</h2>
        <div className="input">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="eg. Jane Doe"
          ></input>
        </div>
      </div>
      <div>
        <h2 className="label">Email*</h2>
        <div className="input">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="eg. janedoe@example.com"
          ></input>
        </div>
      </div>
      <div>
        <h2 className="label">Grade*</h2>
        <div className="input">
          <input
            onChange={(e) => {
              setGrade(e.target.value);
            }}
            value={grade}
            type="number"
            placeholder="eg. 10"
          ></input>
        </div>
      </div>
      <div>
        <h2 className="label">Resume* (.docx and .pdf only)</h2>
        <div className="input-upload">
          <label htmlFor="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i> Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileSelect}
            multiple
          />
          <div className="items-chosen">
            {selectedFiles.map((file) => (
              <div key={file.name}>{file.name}</div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="label">Field(s) of Interest*</h2>
        <div className="input">
          <input
            onChange={(e) => {
              setFieldsOfInterest(e.target.value);
            }}
            value={fieldsOfInterest}
            placeholder="eg. Astrophysics, Biochemistry"
          ></input>
        </div>
      </div>
      <div>
        <h2 className="label">Remote Internship Interest*</h2>
        <div className="input">
          <input
            onChange={(e) => {
              setRemoteInternshipInterest(e.target.value);
            }}
            value={remoteInternshipInterest}
            placeholder="Yes/No"
          ></input>
        </div>
      </div>
      <div
        className="submit-button"
        onClick={() => {
          handleSubmit();
          alert("Form submitted successfully! You will be emailed once you have been approved.");
        }}
      >
        Submit
      </div>
      <div className="logo2-surrounding">
        <img className="logo2" src={logo} />
      </div>
    </div>
  );
}

export default App;
