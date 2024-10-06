import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import InteractionList from '../DummyList/DummyList';
import RepChat from '../RepChat/RepChat';
import dashboardLogo from '../../assets/hitek-dashboard-logo.png';
import { fetchAllInteractionLogs } from '../../services/api';

const Dashboard = () => {
  const [selectedInteractionId, setSelectedInteractionId] = useState(null);
  const [interactionLogs, setInteractionLogs] = useState([]);
  const [businessId, setBusinessId] = useState(null)
  const [platFormId, setPlatFormId] = useState(null)

  const handleSelectInteraction = async (logId) => {
    try {
      const logs = await fetchAllInteractionLogs();
      const mappedData = logs.map(data => data.history)
      setInteractionLogs(mappedData);
      
    } catch (error) {
      console.error("Error fetching interaction logs:", error);
    }
      setPlatFormId(logId.id)
  };

  const handleBusinessId = (id) => {
    setBusinessId(id)
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={dashboardLogo} alt="dashboard-logo" />
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <InteractionList onSelectInteraction={handleSelectInteraction} onSelectBusinessId={handleBusinessId} />
        </aside>
        <main className="dashboard-main">
          <RepChat interactionLogId={selectedInteractionId} logs={interactionLogs} businessID={businessId} platFormId={platFormId} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
