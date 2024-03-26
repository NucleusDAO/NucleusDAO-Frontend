import * as React from 'react';

import { cn } from '@/libs/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-md border border-input bg-[#1E1E1E] dark:bg-dark px-3 py-2 focus:border-primary text-base lg:text-sm file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:font-light placeholder:text-[#666666] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
