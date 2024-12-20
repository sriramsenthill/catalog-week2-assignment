// src/App.tsx
import React from 'react';
import FormValidator from './components/FormValidator';
import { Field } from './types/types';

const App = () => {
  const fields: Field[] = [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'age', type: 'number' },
    { name: 'city', type: 'select', options: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
    { name: 'gender', type: 'radio', options: ['Male', 'Female'] }
  ];

  return (
    <div className="bg-custom-gradient min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <FormValidator fields={fields} />
      </div>
    </div>
  );
};

export default App;
