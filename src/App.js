// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './features/categories/pages/Create';
import Update from './features/categories/pages/Update';
import List from './features/categories/pages/List';
import Home from './pages/Home'
import ListProductPage from './features/products/pages/ListProductPage'
import CreateProductPage from './features/products/pages/CreateProductPage';
import LoginPage from 'features/login/pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/categories" element={<List />} />
        <Route path="/categories/create" element={<Create />} />
        <Route path="/categories/update/:id" element={<Update />} />
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<ListProductPage />}/>
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/login" element={<LoginPage />}/>

      </Routes>
    </Router>
  );
}

export default App;
