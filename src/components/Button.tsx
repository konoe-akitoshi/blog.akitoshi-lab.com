import { forwardRef, ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  variant = "primary", 
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  className = "",
  ...props 
}, ref) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary": 
        return "bg-mono-800 text-white hover:bg-mono-900 focus:ring-mono-600 shadow-sm";
      case "secondary": 
        return "bg-mono-200 text-mono-900 hover:bg-mono-300 focus:ring-mono-500";
      case "outline": 
        return "border border-mono-300 text-mono-700 bg-white hover:bg-mono-50 focus:ring-mono-500";
      case "danger": 
        return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm";
      case "ghost": 
        return "text-mono-600 hover:bg-mono-100 hover:text-mono-900";
      default: 
        return "bg-mono-800 text-white hover:bg-mono-900 focus:ring-mono-600 shadow-sm";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm": return "px-3 py-1.5 text-sm";
      case "md": return "px-4 py-2 text-sm";
      case "lg": return "px-6 py-3 text-base";
      case "xl": return "px-8 py-4 text-lg";
      default: return "px-4 py-2 text-sm";
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-md
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${getVariantClass()}
    ${getSizeClass()}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      ref={ref}
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;