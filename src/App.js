// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './features/categories/pages/Create';
import Update from './features/categories/pages/Update';
import List from './features/categories/pages/List';
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/categories" element={<List />} />
        <Route path="/categories/create" element={<Create />} />
        <Route path="/categories/update/:id" element={<Update />} />
        <Route path="/home" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
