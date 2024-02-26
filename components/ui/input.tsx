import * as React from 'react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/60 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent ${className}`}
            ref={ref}
            {...props}
        />
    );
},
);

Input.displayName = 'Input';