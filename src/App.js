import React, { useState } from "react";
import Certificate from "./components/Certificate";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <div className="app">
      <div className="form-box">
        <h1>Professional Certificate Generator</h1>

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={() => setShowCertificate(true)}>
          Generate Certificate
        </button>
      </div>

      {showCertificate && (
        <Certificate name={name} course={course} date={date} />
      )}
    </div>
  );
}

export default App;

