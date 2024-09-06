import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Importing global styles
import App from './components/App'; // Importing the main App component

// Create the root element for React to render into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    {/* Wrap the App component with BrowserRouter for routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
