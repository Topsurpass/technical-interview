import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
	<input
		ref={ref}
		className={cn(
			'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900',
			'outline-none transition-colors placeholder:text-gray-400',
			'focus:border-transparent focus:ring-2 focus:ring-blue-500',
			'disabled:cursor-not-allowed disabled:opacity-50',
			className,
		)}
		{...props}
	/>
));
Input.displayName = 'Input';
