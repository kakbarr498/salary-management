import React from 'react';
import { render } from 'react-dom';
import EmployeeList from './components/EmployeeList';

const employees = [];

render(
  <EmployeeList employees={employees} />,
  document.getElementById('root') || document.body.appendChild(document.createElement('div'))
);
