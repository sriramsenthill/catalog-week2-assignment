// src/types/types.ts

// Define the type for validation rules
export interface ValidationRule {
    rule: (value: string | number) => boolean;
    message: string;
}

// Define the shape of initial values for form fields
export interface FormField<T> {
    value?: T;
    validationRules?: ValidationRule[];
}

// Define the shape of your form data using generics
export interface FormData {
    [key: string]: FormField<any>;
}

// Define the shape of a field used in FormValidator component
export interface Field {
    name: string;
    type?: string;
    options?: string[];
}

// Define props for the FormValidator component
export interface FormValidatorProps {
    fields: Field[];
    validationRules: Record<string, ValidationRule[]>;
}
