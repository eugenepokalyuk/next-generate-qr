import * as React from 'react';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <textarea
            className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-white/60 disabled:cursor-not-allowed disabled:opacity-50'
            ref={ref}
            {...props}
        />
    );
},
);
Textarea.displayName = 'Textarea';