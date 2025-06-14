import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './Components/Form.jsx';
import Success from './Components/Success.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
