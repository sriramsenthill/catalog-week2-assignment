import './App.css';
import React from 'react';
import FormValidator from './components/FormValidator';

// Define the type for validation rules
interface ValidationRule {
  rule: (value: string) => boolean; // Specify the type of value as string
  message: string;
}

// Define the type for initial values
interface InitialValue {
  value: string;
  validationRules?: ValidationRule[];
}

const initialValues: { [key: string]: InitialValue } = {
  username: {
    value: '',
    validationRules: [{ rule: (val: string) => !!val.trim(), message: 'Username is required' }]
  },
  email: {
    value: '',
    validationRules: [{ rule: (val: string) => /\S+@\S+\.\S+/.test(val), message: 'Email is invalid' }]
  },
};

const App = () => (
  <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4">Form Validator Widget</h1>
    <FormValidator initialValues={initialValues} />
  </div>
);

export default App;
