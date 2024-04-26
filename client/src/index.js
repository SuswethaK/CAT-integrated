import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./components/ChatProvider";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      
        <App />
     
  </React.StrictMode>
);