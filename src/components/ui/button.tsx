'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-60',
	{
		variants: {
			variant: {
				primary: 'bg-blue-600 text-white hover:bg-blue-700',
				ghost: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
				danger: 'border border-red-300 text-red-600 hover:bg-red-50',
			},
			size: {
				default: 'px-5 py-2.5 text-sm',
				sm: 'px-3 py-1.5 text-xs',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, size, className, asChild = false, isLoading, disabled, children, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ variant, size }), className)}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin shrink-0" />}
				{children}
			</Comp>
		);
	},
);
Button.displayName = 'Button';
