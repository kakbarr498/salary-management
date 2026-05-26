import React from 'react';
import { render } from 'react-dom';
import EmployeeListContainer from './components/EmployeeListContainer';
import './styles.css';

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Salary Management</h1>
      </header>
      <main>
        <EmployeeListContainer />
      </main>
    </div>
  );
}

render(<App />, document.getElementById('root'));
