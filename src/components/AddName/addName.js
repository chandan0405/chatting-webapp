import React, { useEffect, useState } from "react";
import "./addName.css";

function PopupButton({ onSubmitName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setName("");
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    onSubmitName(name);
    setIsOpen(false);
    setName(""); 
  };

  return (
    <div>
      <div className="btn">
        <button onClick={handleOpen}>Add Website +</button>
      </div>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Enter Your Name</h3>
            <input
              type="text"
              placeholder="Enter your name"
              className="text-input"
              value={name} // Controlled input
              onChange={handleInputChange} // Capture input changes
            />
            <div className="btn-row">
              {name === "" ? (
                <button className="submit-btn-disabled" disabled>
                  Submit
                </button>
              ) : (
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
              <button className="submit-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupButton;
