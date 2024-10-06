// Start of C:\Users\Admin\Desktop\HITEK AI Chat Widget\HITEK Dashboard - Copy\src\services\api.js

import axios from 'axios';

//const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = "https://widget-backend-vs8y.onrender.com";

export const createInteractionLog = async ({ businessId, platformId }) => {
  const response = await axios.post(`${apiUrl}/api/interaction-logs`, { businessId, platformId });
  return response.data;
};

export const sendMessage = async (interactionLogId, message) => {
  const response = await axios.post(`${apiUrl}/api/chat`, { interactionLogId, message });
  return response.data;
};

export const setHandoverFlag = async (interactionLogId) => {
  await axios.post(`${apiUrl}/api/handover`, { interactionLogId });
};

export const fetchConversationHistory = async (interactionLogId) => {
  const response = await axios.get(`${apiUrl}/api/interaction-logs/${interactionLogId}`);
  return response.data;
};

export const sendRepMessage = async (interactionLogId, message) => {
  await axios.post(`${apiUrl}/api/rep-chat`, { interactionLogId, message });
};

// New function to fetch all interaction logs
export const fetchAllInteractionLogs = async () => {
  const response = await axios.get(`${apiUrl}/api/interaction-logs`);
  return response.data;
};


export const fetchPlatformLogs = async () => {
  const response = await axios.get(`${apiUrl}/api/platforms`);
  return response.data;
};


export const fetchBusinessDetailsData = async () => {
  const response = await axios.get(`${apiUrl}/api/businesses`);
  return response.data;
};


export const addBusiness = async (businessData) => {
  const response = await axios.post(`${apiUrl}/api/businesses`, businessData);
  return response.data;
}

// End of C:\Users\Admin\Desktop\HITEK AI Chat Widget\HITEK Dashboard - Copy\src\services\api.js
