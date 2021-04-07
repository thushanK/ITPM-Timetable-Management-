import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Routes/Router'
import './custom.scss'
import './custom.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure() 

function App() {
  return (
    <Router/>
  );
}

export default App;
