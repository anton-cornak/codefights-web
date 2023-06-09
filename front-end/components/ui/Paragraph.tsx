import React from "react";
import { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paragraphVariants = cva(
	"max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center",
	{
		variants: {
			size: {
				default: "text-xs sm:text-sm",
				sm: "text-1xl sm:text-base",
				lg: "text-2xl",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

interface ParagraphProps
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof paragraphVariants> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
	({ className, size, children, ...props }, ref) => {
		return (
			<p
				ref={ref}
				{...props}
				className={cn(paragraphVariants({ size, className }))}
			>
				{children}
			</p>
		);
	},
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
