import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    controlNumber: "",
    plateNumber: "",
    motorcycleModel: "",
    motorcycleVersion: "",
  });

  const [modal, setModal] = useState({ show: false, messages: [], type: "" });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const motorcycleVersions = {
    "Honda Click": ["Click 125i", "Click 150i", "Click 160"],
    "Honda Beat": ["Beat Street", "Beat Fashion Sport"],
    "Honda Pcx": ["PCX 125", "PCX 150", "PCX Hybrid"],
    "Honda Adv": ["ADV 150", "ADV 160"],
    Dio: ["Dio 110", "Dio 125"],
    Genio: ["Genio 110", "Genio 125"],
    Airblade: ["Airblade 125", "Airblade 150"],
    PCX: ["PCX 125", "PCX 150", "PCX Hybrid"],
    ADV: ["ADV 150", "ADV 160"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "motorcycleModel" && { motorcycleVersion: "" }), // Reset version if model changes
    });
  };

  const checkDuplicates = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/check-duplicates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          controlNumber: formData.controlNumber,
          plateNumber: formData.plateNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Show modal for each individual error
        if (data.userNameExists) {
          setModal({ show: true, messages: ["Username already exists"], type: "error" });
          return; // Stop checking further if there's a username error
        }

        if (data.emailExists) {
          setModal({ show: true, messages: ["Email already exists"], type: "error" });
          return; // Stop checking further if there's an email error
        }

        if (data.controlNumberExists) {
          setModal({ show: true, messages: ["Control number already exists"], type: "error" });
          return; // Stop checking further if there's a control number error
        }

        if (data.plateNumberExists) {
          setModal({ show: true, messages: ["Plate number already exists"], type: "error" });
          return; // Stop checking further if there's a plate number error
        }
      }
    } catch (error) {
      console.error("Error checking duplicates:", error);
      setModal({ show: true, messages: ["An error occurred, please try again later."], type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (Object.values(formData).some((field) => !field)) {
      setModal({ show: true, messages: ["Please fill out all fields"], type: "error" });
      return;
    }

    await checkDuplicates(); // Check for duplicates one by one

    // If no error, proceed with the registration
    try {
      const registerResponse = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (registerResponse.ok) {
        setModal({ show: true, messages: ["User registered successfully!"], type: "success" });
        setIsSubmitDisabled(false);
      } else {
        const error = await registerResponse.text();
        setModal({ show: true, messages: [error], type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setModal({ show: true, messages: ["An error occurred, please try again later."], type: "error" });
    }
  };

  const closeModal = () => setModal({ ...modal, show: false });

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Sign Up</h1>

        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Control Number</label>
            <input
              type="text"
              name="controlNumber"
              value={formData.controlNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Plate Number</label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Motorcycle Model</label>
            <select
              name="motorcycleModel"
              value={formData.motorcycleModel}
              onChange={handleChange}
              required
            >
              <option value="">Select Motorcycle Model</option>
              <option value="Honda Click">Honda Click</option>
              <option value="Honda Beat">Honda Beat</option>
              <option value="Honda Pcx">Honda Pcx</option>
              <option value="Honda Adv">Honda Adv</option>
              <option value="Dio">Dio</option>
              <option value="Genio">Genio</option>
              <option value="Airblade">Airblade</option>
              <option value="PCX">PCX</option>
              <option value="ADV">ADV</option>
            </select>
          </div>
        </div>

        {formData.motorcycleModel && (
          <div className="form-row">
            <div className="form-group">
              <label>Motorcycle Version</label>
              <select
                name="motorcycleVersion"
                value={formData.motorcycleVersion}
                onChange={handleChange}
                required
              >
                <option value="">Select Version</option>
                {motorcycleVersions[formData.motorcycleModel].map((version) => (
                  <option key={version} value={version}>
                    {version}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <button type="submit" disabled={isSubmitDisabled}>Register</button>

        <p>Already registered?</p>
        <Link to="/login">Go to Login</Link>
      </form>

      {/* Modal Popup */}
      {modal.show && (
        <div className="modal-overlay">
          <div className={`modal ${modal.type}`}>
            {modal.messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
