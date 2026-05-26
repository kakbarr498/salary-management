import React from 'react';
import { render } from 'react-dom';
import EmployeeListContainer from './components/EmployeeListContainer';

function App() {
  return (
    <div>
      <h1>Salary Management</h1>
      <EmployeeListContainer />
    </div>
  );
}

render(<App />, document.getElementById('root'));
