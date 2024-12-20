// src/validation/validationRules.ts
import { ValidationRule } from '../types/types';

export const validationRules: Record<string, ValidationRule[]> = {
    name: [
        { rule: (val: unknown) => typeof val === 'string' && !!val.trim(), message: 'Name is required' },
        { rule: (val: unknown) => typeof val === 'string' && /^[A-Za-z\s]+$/.test(val), message: 'Name must contain only letters.' },
    ],
    email: [
        { rule: (val: unknown) => typeof val === 'string' && !!val.trim(), message: 'Email is required' },
        { rule: (val: unknown) => typeof val === 'string' && /\S+@\S+\.\S+/.test(val), message: 'Email is invalid' },
    ],
    password: [
        {
            rule: (val: unknown) => typeof val === 'string' && !!val.trim(),
            message: 'Password is required',
        },
        {
            rule: (val: unknown) =>
                typeof val === 'string' && /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val),
            message:
                'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
        },
    ],
    age: [
        {
            rule: (val: unknown) => typeof val === 'string' && !!val.trim(),
            message: 'Age is required',
        },
        {
            rule: (val: unknown) => {
                const numVal = Number(val);
                return Number.isInteger(numVal) && numVal > 0 && numVal < 120;
            },
            message: 'Age must be a valid number between 1 and 120.'
        }
    ],
    city: [
        { rule: (val: unknown) => typeof val === 'string' && !!val.trim(), message: 'City is required.' },
    ],
    gender: [
        { rule: (val: unknown) => typeof val === 'string' && !!val.trim(), message: 'Gender is required.' },
    ],
};
