// src/components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
    messages?: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ messages }) => (
    <div className="text-red-500 text-sm">
        {messages && messages.map((msg, index) => (
            <p key={index}>{msg}</p>
        ))}
    </div>
);

export default ErrorMessage;
