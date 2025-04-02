import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MainLayout from './components/layout/MainLayout';
import './styles/index.css';

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/movie/:id" element={<MainLayout><MovieDetailsPage /></MainLayout>} />
          <Route path="/search" element={<MainLayout><SearchResultsPage /></MainLayout>} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;