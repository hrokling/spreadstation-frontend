import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/instruments'>Instruments</Link>
        </li>
        <li>
          <Link to='/data-ingestion'>Data Ingestion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
