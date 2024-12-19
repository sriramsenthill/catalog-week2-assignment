// src/App.tsx
import './App.css';
import React from 'react';
import FormValidator from './components/FormValidator';
import { validationRules } from './validation/validationRules';
import { Field } from './types/types';

const App = () => {

  const fields: Field[] = [
    { name: 'username', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'age', type: 'number' },
    { name: 'city', type: 'select', options: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
    { name: 'gender', type: 'radio', options: ['male', 'female'] }
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form Validator Widget</h1>
      <FormValidator fields={fields} validationRules={validationRules} />
    </div>
  );
};

export default App;
