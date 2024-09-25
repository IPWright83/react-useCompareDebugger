import ReactDOM from 'react-dom/client';
import './index.css';

import React from 'react';
import App from "./App";

const element = document.getElementById('root');
const root = ReactDOM.createRoot(element);
root.render(
  <App name="ian" />
);

