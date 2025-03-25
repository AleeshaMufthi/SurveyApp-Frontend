import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import AdminRoutes from './routes/AdminRoutes';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <div className="bg-white">
      <Routes> 
        <Route path="/" element={<SurveyForm />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
}
export default App
