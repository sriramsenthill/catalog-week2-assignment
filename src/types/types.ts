export interface ValidationRule {
    rule: (value: any) => boolean;
    message: string;
}

export interface FormField {
    value: any;
    validationRules?: ValidationRule[];
}

export interface FormData {
    [key: string]: FormField;
}


export interface Field {
    name: string;
    type?: string;
    options?: string[];
}

export interface FormValidatorProps {
    fields: Field[];
    validationRules: Record<string, ValidationRule[]>;
}
