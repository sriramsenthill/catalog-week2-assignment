// src/App.tsx
import './App.css';
import React from 'react';
import FormValidator from './components/FormValidator';

// Define the type for validation rules
interface ValidationRule {
  rule: (value: string) => boolean;
  message: string;
}

// Define the shape of your form's initial values
interface FormData {
  username: { value?: string; validationRules?: ValidationRule[] };
  email: { value?: string; validationRules?: ValidationRule[] };
  password: { value?: string; validationRules?: ValidationRule[] };
  age: { value?: number; validationRules?: ValidationRule[] };
  city: { value?: string; validationRules?: ValidationRule[] };
  gender: { value?: string; validationRules?: ValidationRule[] };
}

const initialValues: FormData = {
  username: {
    value: '',
    validationRules: [{ rule: (val) => !!val.trim(), message: 'Username is required' }],
  },
  email: {
    value: '',
    validationRules: [{ rule: (val) => /\S+@\S+\.\S+/.test(val), message: 'Email is invalid' }],
  },
  password: {
    value: '',
    validationRules: [
      {
        rule: (val) =>
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val),
        message:
          'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
      },
    ],
  },
  age: {
    value: undefined,
    validationRules: [
      { rule: (val) => Number.isInteger(Number(val)) && Number(val) > 0 && Number(val) < 120, message: 'Age must be a valid number between 1 and 120.' },
    ],
  },
  city: {
    value: '',
    validationRules: [{ rule: (val) => !!val, message: 'City is required.' }],
  },
  gender: {
    value: '',
    validationRules: [{ rule: (val) => !!val, message: 'Gender is required.' }],
  },
};

const App = () => (
  <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4">Form Validator Widget</h1>
    <FormValidator initialValues={initialValues} />
  </div>
);

export default App;
