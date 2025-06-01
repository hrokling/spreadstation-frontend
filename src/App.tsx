import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation, ProtectedRoute, AdminLayout } from './components';
import {
  HomePage,
  InstrumentsPage,
  DataIngestionPage,
  LoginPage,
  AnalyticsPage,
  UsersPage,
  SettingsPage,
  TestPage
} from './pages';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          {/* Public routes with simple navigation */}
          <Route path='/login' element={
            <>
              <Navigation />
              <main style={{ padding: '2rem' }}>
                <LoginPage />
              </main>
            </>
          } />

          {/* Public home route with simple navigation */}
          <Route path='/' element={
            <>
              <Navigation />
              <main style={{ padding: '2rem' }}>
                <HomePage />
              </main>
            </>
          } />

          {/* Protected routes with admin layout */}
          <Route path='/admin' element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            <Route path='instruments' element={<InstrumentsPage />} />
            <Route path='data-ingestion' element={<DataIngestionPage />} />
            <Route path='analytics' element={<AnalyticsPage />} />
            <Route path='users' element={<UsersPage />} />
            <Route path='settings' element={<SettingsPage />} />
            <Route path='test' element={<TestPage />} />
          </Route>

          {/* Legacy protected routes (redirect to admin layout) */}
          <Route
            path='/instruments'
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<InstrumentsPage />} />
          </Route>

          <Route
            path='/data-ingestion'
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DataIngestionPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
