import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './routes'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
