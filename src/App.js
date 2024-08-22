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
import RegisterPage from 'features/register/pages/RegisterPage';
import MainLayout from 'layouts/MainLayout';


function App() {
  return (
    <Router>
      <Routes>
      <Route element={<MainLayout />}>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/" element={<Home />}/>

      </Route>

        <Route path="/categories" element={<List />} />
        <Route path="/categories/create" element={<Create />} />
        <Route path="/categories/update/:id" element={<Update />} />
        <Route path="/products" element={<ListProductPage />}/>
        <Route path="/products/create" element={<CreateProductPage />} />

      </Routes>
    </Router>
  );
}

export default App;
