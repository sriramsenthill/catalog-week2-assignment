import { FormData } from '../types/types';

export const validateForm = (fields: string[], values: FormData) => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
        const value = values[field]?.value;

        // Check for required fields first
        if (!value) {
            newErrors[field] = 'This field is required.'; // Set required error message
        } else {
            // Validate against specific rules if the field is not empty
            const errorMessage = validateField(field, value, values);
            if (errorMessage) {
                newErrors[field] = errorMessage; // Set specific error message
            }
        }
    });

    return newErrors;
};

const validateField = (name: string, value: string, values: FormData) => {
    const fieldRules = values[name]?.validationRules || [];
    let errorMessage = '';

    for (const rule of fieldRules) {
        if (!rule.rule(value)) {
            errorMessage = rule.message;
            break; // Stop checking further rules once an error is found
        }
    }

    return errorMessage; // Return the error message or an empty string if valid
};
