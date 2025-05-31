import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation, ProtectedRoute } from './components';
import { HomePage, InstrumentsPage, DataIngestionPage, LoginPage } from './pages';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navigation />
        <main style={{ padding: '2rem' }}>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />

            {/* Protected routes */}
            <Route
              path='/instruments'
              element={
                <ProtectedRoute>
                  <InstrumentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/data-ingestion'
              element={
                <ProtectedRoute>
                  <DataIngestionPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
