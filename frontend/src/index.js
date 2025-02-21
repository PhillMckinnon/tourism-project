import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './i18n'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
