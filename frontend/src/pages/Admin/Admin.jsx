// src/pages/Admin.jsx
import React, { useState } from 'react';
import Clients from '../../components/Clients';
import Tours from '../../components/Tours';
import Bookings from '../../components/Bookings';
import Countries from '../../components/Countries';
//import './Admin.css'; // Keep your existing CSS for styling
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
        <button className={`tab-button ${activeTab === 'clients' ? 'active' : ''}`} onClick={() => setActiveTab('clients')}>Клиенты</button>
        <button className={`tab-button ${activeTab === 'tours' ? 'active' : ''}`} onClick={() => setActiveTab('tours')}>Туры</button>
        <button className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>Бронирования</button>
        <button className={`tab-button ${activeTab === 'countries' ? 'active' : ''}`} onClick={() => setActiveTab('countries')}>Страны</button>

      </div>
      {renderContent()}
     <button className="logout-btn" onClick={handleLogout}>Выйти</button>
    </div>
  );
};
export default Admin;
