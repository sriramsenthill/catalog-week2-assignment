// src/validation/validationRules.ts
import { ValidationRule } from '../types/types'; // Import the ValidationRule type

export const validationRules: Record<string, ValidationRule[]> = {
    username: [
        { rule: (val) => !!val.trim(), message: 'Username is required' },
    ],
    email: [
        { rule: (val) => /\S+@\S+\.\S+/.test(val), message: 'Email is invalid' },
    ],
    password: [
        {
            rule: (val) =>
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val),
            message:
                'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
        },
    ],
    age: [
        {
            rule: (val) => {
                const numVal = Number(val); // Convert the input to a number
                // Check if numVal is an integer and then perform the comparison
                return Number.isInteger(numVal) && numVal > 0 && numVal < 120;
            },
            message: 'Age must be a valid number between 1 and 120.'
        }
    ],
    city: [
        { rule: (val) => !!val, message: 'City is required.' },
    ],
    gender: [
        { rule: (val) => !!val, message: 'Gender is required.' },
    ],
};
