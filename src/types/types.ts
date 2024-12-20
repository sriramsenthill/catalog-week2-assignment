// src/types/types.ts

export interface ValidationRule {
    rule: (value: any) => boolean; // Adjust type as necessary
    message: string;
}

export interface FormField {
    value: any; // Adjust type based on expected input types
    validationRules?: ValidationRule[];
}

export interface FormData {
    [key: string]: FormField; // Dynamic keys for form fields
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
