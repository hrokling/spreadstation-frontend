import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components';
import { HomePage, InstrumentsPage, DataIngestionPage } from './pages';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navigation />
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/instruments' element={<InstrumentsPage />} />
            <Route path='/data-ingestion' element={<DataIngestionPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
