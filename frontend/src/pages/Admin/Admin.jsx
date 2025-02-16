import React, { useState } from 'react';
import Clients from '../../components/Clients';
import Tours from '../../components/Tours';
import Bookings from '../../components/Bookings';
import Countries from '../../components/Countries';
import { useNavigate } from 'react-router-dom';

const Admin = ({ handleLogout }) => {
  const [activeTab, setActiveTab] = useState('clients');

  const renderContent = () => {
    switch (activeTab) {
      case 'clients':
        return <Clients />;
      case 'tours':
        return <Tours />;
      case 'bookings':
        return <Bookings />;
      case 'countries':
        return <Countries />;
      default:
        return <Clients />;
    }
  };
  return (
    <div className="admin-container">
      <div className="tab-buttons">
        <button className={`tab-button ${activeTab === 'clients' ? 'active' : ''}`} onClick={() => setActiveTab('clients')}>Clients</button>
        <button className={`tab-button ${activeTab === 'tours' ? 'active' : ''}`} onClick={() => setActiveTab('tours')}>Tour</button>
        <button className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>Bookings</button>
        <button className={`tab-button ${activeTab === 'countries' ? 'active' : ''}`} onClick={() => setActiveTab('countries')}>Countries</button>

      </div>
      {renderContent()}
     <button className="logout-btn" onClick={handleLogout}>Exit</button>
    </div>
  );
};
export default Admin;
