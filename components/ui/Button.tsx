import {
	forwardRef,
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
} from "react";

type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	variant?: "primary" | "secondary" | "ghost";
	size?: "md" | "lg";
};

function cn(
	...classes: Array<string | false | null | undefined>
): string {
	return classes.filter(Boolean).join(" ");
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "primary", size = "md", ...props }, ref) => {
		const variants: Record<typeof variant, string> = {
			primary:
				"bg-red-600 text-black hover:bg-red-500 focus-visible:outline-red-400",
			secondary:
				"bg-neutral-800 text-neutral-100 hover:bg-neutral-700 focus-visible:outline-neutral-400",
			ghost:
				"bg-transparent text-neutral-200 hover:bg-neutral-900/60 focus-visible:outline-neutral-500",
		};

		const sizes: Record<typeof size, string> = {
			md: "px-5 py-2 text-sm",
			lg: "px-7 py-3 text-base",
		};

		return (
			<button
				ref={ref}
				className={cn(
					"inline-flex items-center justify-center gap-2 rounded-sm border border-transparent font-semibold uppercase tracking-[0.35em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
					variants[variant],
					sizes[size],
					className
				)}
				{...props}
			/>
		);
	}
);

Button.displayName = "Button";

export { Button };
