// src/types/types.ts

// Define the type for validation rules
export interface ValidationRule {
    rule: (value: string | number) => boolean; // Accepts both string and number for flexibility
    message: string;
}

// Define the shape of initial values for form fields
export interface FormField<T> {
    value?: T; // Generic type to allow different types (string, number, etc.)
    validationRules?: ValidationRule[];
}

// Define the shape of your form data using generics
export interface FormData {
    [key: string]: FormField<any>; // Allows any field name with corresponding FormField structure
}

// Define the shape of a field used in FormValidator component
export interface Field {
    name: string;
    type?: string; // Optional type for input (text, email, password, etc.)
    options?: string[]; // Optional options for select or radio inputs
}

// Define props for the FormValidator component
export interface FormValidatorProps {
    fields: Field[]; // Array of fields to be rendered in the form
    validationRules: Record<string, ValidationRule[]>; // Object mapping field names to their validation rules
}
