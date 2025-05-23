import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../public/assets/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-datepicker/dist/react-datepicker.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);