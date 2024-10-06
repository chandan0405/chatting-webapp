import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rep-chat" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/rep-chat" />} />
      </Routes>
    </Router>
  );
}

export default App;
