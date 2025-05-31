import React from 'react';
import { env } from '../utils';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>{env.appName}</h1>
      <p>Version: {env.appVersion}</p>
      <p>Welcome to the SpreadStation administration interface.</p>
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h3>Environment Info</h3>
        <ul>
          <li>API Base URL: {env.apiBaseUrl}</li>
          <li>Debug Mode: {env.enableDebug ? 'Enabled' : 'Disabled'}</li>
          <li>Mock Data: {env.enableMockData ? 'Enabled' : 'Disabled'}</li>
          <li>Log Level: {env.logLevel}</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
