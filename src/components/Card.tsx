import { ReactNode, HTMLAttributes } from 'react';

type CardVariant = "default" | "elevated" | "outlined" | "subtle" | "transparent";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  clickable?: boolean;
}

const Card = ({ 
  children, 
  variant = "default",
  hover = false,
  clickable = false,
  className = "",
  ...props 
}: CardProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case "elevated": 
        return "bg-white shadow-lg border border-mono-100";
      case "outlined": 
        return "bg-white border-2 border-mono-200";
      case "subtle": 
        return "bg-mono-50 border border-mono-200";
      case "transparent": 
        return "bg-transparent border border-mono-300";
      default: 
        return "bg-white shadow-sm border border-mono-200";
    }
  };

  const getInteractionClass = () => {
    if (clickable) {
      return "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-mono-300";
    }
    if (hover) {
      return "transition-all duration-200 hover:shadow-md";
    }
    return "";
  };

  const baseClasses = `
    rounded-xl overflow-hidden
    ${getVariantClass()}
    ${getInteractionClass()}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

interface CardSubComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardHeader = ({ children, className = "", ...props }: CardSubComponentProps) => (
  <div className={`px-4 py-3 border-b border-mono-200 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }: CardSubComponentProps) => (
  <div className={`px-4 py-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "", ...props }: CardSubComponentProps) => (
  <div className={`px-4 py-3 border-t border-mono-200 bg-mono-50 ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;