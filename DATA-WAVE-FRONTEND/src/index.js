import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { ThemeContextProvider } from './CONTEXT/TehemeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeContextProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeContextProvider>
);

