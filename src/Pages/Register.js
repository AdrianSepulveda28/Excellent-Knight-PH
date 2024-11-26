import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    controlNumber: "", // Changed from idNumber to controlNumber
    plateNumber: "",
    motorcycleModel: "",
    motorcycleVersion: "",
  });

  // Define the versions for each motorcycle model
  const motorcycleVersions = {
    "Honda Click": ["Click 125i", "Click 150i", "Click 160"],
    "Honda Beat": ["Beat Street", "Beat Fashion Sport"],
    "Honda Pcx": ["PCX 125", "PCX 150", "PCX Hybrid"],
    "Honda Adv": ["ADV 150", "ADV 160"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "motorcycleModel" && { motorcycleVersion: "" }), // Reset version if model changes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => !field)) {
      alert("Please fill out all fields");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Sign Up</h1>

        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="fas fa-user"></i> Username
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Enter username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <i className="fas fa-user"></i> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="fas fa-id-card"></i> Control Number
            </label>
            <input
              type="text"
              name="controlNumber" // Changed name to controlNumber
              placeholder="Enter control number"
              value={formData.controlNumber} // Updated value to match controlNumber
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <i className="fas fa-car"></i> Plate Number
            </label>
            <input
              type="text"
              name="plateNumber"
              placeholder="Enter plate number"
              value={formData.plateNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="fas fa-motorcycle"></i> Motorcycle Model
            </label>
            <select
              name="motorcycleModel"
              value={formData.motorcycleModel}
              onChange={handleChange}
              required
              className="motorcycle-model-select"
            >
              <option value="">Select Motorcycle Model</option>
              <option value="Honda Click">Honda Click</option>
              <option value="Honda Beat">Honda Beat</option>
              <option value="Honda Pcx">Honda Pcx</option>
              <option value="Honda Adv">Honda Adv</option>
            </select>
          </div>
        </div>

        {formData.motorcycleModel && (
          <div className="form-row">
            <div className="form-group">
              <label>
                <i className="fas fa-cogs"></i> Motorcycle Version
              </label>
              <select
                name="motorcycleVersion"
                value={formData.motorcycleVersion}
                onChange={handleChange}
                required
                className="motorcycle-version-select"
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

        <button type="submit">Register</button>

        <p>Already registered?</p>
        <Link to="/login" className="login-link">
          Go to Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
