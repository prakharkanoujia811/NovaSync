import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import { GroupProvider } from './context/GroupProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <BrowserRouter>
    <AuthProvider>
      <GroupProvider>
        <App />
      </GroupProvider>
    </AuthProvider>
  </BrowserRouter>
  
);
