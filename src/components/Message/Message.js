// C:\Users\Admin\Desktop\HITEK Chatbot 2\frontend\src\components\Chat\Message.js

import React from 'react';
import logo from '../../assets/logo.png'; // Ensure you have a logo.png in the assets folder
import './Chat.css';

const Message = ({ role, content, timestamp }) => {
  const isAssistant = role === 'assistant';
  const isRep = role === 'HITEK rep';
  const isUser = role === 'user';
  return (
    <div className={`chat-message-container ${isAssistant ? 'assistant' : isRep ? 'rep' : 'user'}`}>
      {/* {(isUser || isRep) && <div className="message-label">{role === 'assistant' ? 'HITEK Bot' : 'HITEK Rep'}</div>} */}
      {isUser && <img src={logo} alt="Logo" className={`${"ai-logo"} user_logo`} />}
      <div className="message-wrapper">
        {/* {isAssistant ? <div className="message-label">{role === 'assistant' ? 'HITEK Bot' : 'HITEK Rep'}</div> : <div className={`${"message-label"} text_label`}>{role === 'isUser' ? 'User' : 'USER Rep'}</div>} */}
        {(isUser) && <div className={`${"message-label"} text_label`}>{role === 'isUser' ? 'User' : 'USER Rep'}</div>}
        {(isAssistant || isRep) && <div className="message-label">{role === 'assistant' ? 'HITEK Bot' : 'HITEK Rep'}</div>}
        <div className={`chat-message ${isAssistant ? 'assistant' : isRep ? 'rep' : 'user'}`}>
          <span>{content}</span>
        </div>
        <div className={`timestamp ${isAssistant ? 'assistant' : isRep ? 'rep' : 'user'}`}>{timestamp}</div>
      </div>
      {(isAssistant || isRep) && <img src={logo} alt="Logo" className="ai-logo" />}
      {/* {(isAssistant || isRep) && <img src={logo} alt="Logo" className="ai-logo" />} */}
    </div>
  );
};

export default Message;
