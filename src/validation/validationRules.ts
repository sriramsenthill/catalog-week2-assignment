// src/validation/validationRules.ts
import { ValidationRule } from '../types/types';

export const validationRules: Record<string, ValidationRule[]> = {
    name: [
        { rule: (val) => !!val.trim(), message: 'Name is required' },
        { rule: (val) => /^[A-Za-z\s]+$/.test(val), message: 'Name must contain only letters.' }, // New rule for only letters
    ],
    email: [
        { rule: (val) => !!val.trim(), message: 'Email is required' }, // Added required check
        { rule: (val) => /\S+@\S+\.\S+/.test(val), message: 'Email is invalid' },
    ],
    password: [
        {
            rule: (val) => !!val.trim(), // Check for required
            message: 'Password is required',
        },
        {
            rule: (val) =>
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val),
            message:
                'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
        },
    ],
    age: [
        {
            rule: (val) => !!val.trim(), // Check for required
            message: 'Age is required',
        },
        {
            rule: (val) => {
                const numVal = Number(val);
                return Number.isInteger(numVal) && numVal > 0 && numVal < 120;
            },
            message: 'Age must be a valid number between 1 and 120.'
        }
    ],
    city: [
        { rule: (val) => !!val.trim(), message: 'City is required.' }, // Added required check
    ],
    gender: [
        { rule: (val) => !!val.trim(), message: 'Gender is required.' }, // Added required check
    ],
};
