import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./styles.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    course: "",
    date: "",
    issuer: "",
  });

  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const downloadPDF = async () => {
    const input = document.getElementById("certificate");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 277, 190);
    pdf.save("certificate.pdf");
  };

  return (
    <div className="app">
      <h1 className="title">Certificate Generator</h1>

      <div className="form">
        <input name="name" placeholder="Recipient Name" onChange={handleChange} />
        <input name="course" placeholder="Course Title" onChange={handleChange} />
        <input type="date" name="date" onChange={handleChange} />
        <input name="issuer" placeholder="Issuer Name" onChange={handleChange} />

        <label>
          Upload Logo:
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </label>

        <button onClick={downloadPDF}>Download Certificate</button>
      </div>

      <div id="certificate" className="certificate">
        {logo && <img src={logo} alt="logo" className="logo" />}

        <h2>Certificate of Completion</h2>
        <p>This certifies that</p>
        <h1>{form.name || "Recipient Name"}</h1>
        <p>has completed</p>
        <h3>{form.course || "Course Title"}</h3>

        <div className="footer">
          <p>Date: {form.date || "DD/MM/YYYY"}</p>
          <p>Issued by: {form.issuer || "Organization Name"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

