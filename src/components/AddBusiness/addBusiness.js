// Path: C:\Users\Admin\Desktop\HITEK Chatbot\frontend\src\components\Dashboard\addBusiness.js

import React, { useState } from "react";
import "./addBusiness.css";
import { addBusiness } from '../../services/api';

function PopupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setName("");
    setLogoUrl("");
    setWelcomeMessage("");
    setSystemPrompt("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLogoUrlChange = (event) => {
    setLogoUrl(event.target.value);
  };

  const handleWelcomeMessageChange = (event) => {
    setWelcomeMessage(event.target.value);
  };

  const handleSystemPromptChange = (event) => {
    setSystemPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    const businessData = { name, logo_url: logoUrl, welcome_message: welcomeMessage, system_prompt: systemPrompt };
    try {
      await addBusiness(businessData);
      setIsOpen(false);
      setName("");
      setLogoUrl("");
      setWelcomeMessage("");
      setSystemPrompt("");
    } catch (error) {
      console.error('Failed to add business:', error);
    }
  };

  return (
    <div>
      <div className="btn">
        <button onClick={handleOpen}>Add Business +</button>
      </div>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Enter Business Details</h3>
            <input
              type="text"
              placeholder="Enter business name"
              className="text-input"
              value={name}
              onChange={handleNameChange}
            />
            <input
              type="text"
              placeholder="Enter logo URL"
              className="text-input"
              value={logoUrl}
              onChange={handleLogoUrlChange}
            />
            <input
              type="text"
              placeholder="Enter welcome message"
              className="text-input"
              value={welcomeMessage}
              onChange={handleWelcomeMessageChange}
            />
            <input
              type="text"
              placeholder="Enter system prompt"
              className="text-input"
              value={systemPrompt}
              onChange={handleSystemPromptChange}
            />
            <div className="btn-row">
              <button className="submit-btn close-btn" onClick={handleClose}>
                Close
              </button>
              {name === "" ? (
                <button className="submit-btn-disabled" disabled>
                  Submit
                </button>
              ) : (
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupButton;

// End of C:\Users\Admin\Desktop\HITEK Chatbot\frontend\src\components\Dashboard\addBusiness.js
