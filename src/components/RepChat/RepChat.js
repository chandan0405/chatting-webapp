import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './RepChat.css';
import Message from '../Message/Message';
import { createInteractionLog } from '../../services/api';

const apiUrl = "http://localhost:4000";
const socket = io(apiUrl);

const RepChat = ({ logs, businessID, platFormId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [interactionLogId, setInteractionLogId] = useState(localStorage.getItem('interactionLogId'));
  const platformId = platFormId;
  const businessId = businessID

  // Function to update local storage
  const updateLocalStorage = (messages) => {
    if (interactionLogId) {
      localStorage.setItem(`chat_messages_${interactionLogId}`, JSON.stringify(messages));
    }
  };

  useEffect(() => {
    const result = logs.flatMap(subArray =>
      subArray.map(item => ({
        content: item.content,
        role: item.role,
        timestamp: new Date(item.timestamp).toLocaleString() // Keep the timestamp simple
      }))
    ).filter(item => item.content && item.role);

    setMessages(result);
  }, [logs]);

  useEffect(() => {
    const initializeInteractionLog = async () => {
      try {
        const interactionLog = await createInteractionLog({ businessId, platformId });
        const newInteractionLogId = interactionLog.id;
        localStorage.setItem('interactionLogId', newInteractionLogId);
        setInteractionLogId(newInteractionLogId);
      } catch (error) {
        console.error('Failed to initialize interaction log:', error);
      }
    };

    if (!interactionLogId && businessId && platformId) {
      initializeInteractionLog();
    }
  }, [businessId, platformId]);

  useEffect(() => {
    document.body.classList.add('rep-chat-body');

    const logId = interactionLogId;

    if (logId) {
      const localStorageKey = `chat_messages_${logId}`;
      const fetchConversationHistory = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/interaction-logs/${logId}`);
          const fetchedMessages = response.data.history || [];
           console.log("response", response);
          // Load existing messages from local storage
          const savedMessages = JSON.parse(localStorage.getItem(localStorageKey)) || [];
          const allMessages = [...savedMessages, ...fetchedMessages];
      
          // Remove duplicates
          const uniqueMessages = allMessages.reduce((acc, current) => {
            const x = acc.find(item => item.timestamp === current.timestamp && item.content === current.content);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
      
          setMessages(uniqueMessages);
          updateLocalStorage(uniqueMessages); // Update local storage with unique messages
        } catch (error) {
          console.log('Error fetching conversation history:', error);
        }
      };
      

      fetchConversationHistory();

      const handleMessage = (data) => {
        console.log(data,"msghandledd::")
        // if (data.interactionLogId === logId) {
          setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some(msg =>
              msg.timestamp === data.message.timestamp && msg.content === data.message.content
            );
      
            if (!isDuplicate) {
              const updatedMessages = [...prevMessages, data.message];
              updateLocalStorage(updatedMessages); // Update local storage
              return updatedMessages;
            }
      
            return prevMessages; // Return previous state if it's a duplicate
          });
        // }
      };
      
      socket.on('receiveMessage', handleMessage);

      return () => {
        socket.off('receiveMessage', handleMessage);
        document.body.classList.remove('rep-chat-body');
      };
    }
  }, [interactionLogId]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
  
    const repMessage = {
      role: 'HITEK rep',
      content: input,
      timestamp: new Date().toLocaleString()
    };
  
    try {
      socket.emit('sendMessage', { interactionLogId, message: repMessage });
      await axios.post(`${apiUrl}/api/rep-chat`, { interactionLogId, message: input,businessId, platformId});
      setInput('');
  
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, repMessage];
  
        // Remove duplicates before updating local storage
        const uniqueMessages = updatedMessages.reduce((acc, current) => {
          const x = acc.find(item => item.timestamp === current.timestamp && item.content === current.content);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
  
        updateLocalStorage(uniqueMessages); // Update local storage
        return uniqueMessages; // Set unique messages
      });
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };
  

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleExportChat = () => {
    const fileName = `chat_history_${interactionLogId}.json`;
    const json = JSON.stringify(messages, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rep-chat-container">
      <div className="rep-chat-header">
        <a href="#" onClick={handleExportChat} className="export-link">
          <span className="glyphicon glyphicon-export"></span> Export Chat
        </a>
      </div>
      <div className="rep-chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
        ))}
      </div>
      <div className="rep-chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} className="send-button">➤</button>
      </div>
    </div>
  );
};

export default RepChat;
