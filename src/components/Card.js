const Card = ({ 
  children, 
  variant = "default",
  hover = false,
  clickable = false,
  className = "",
  ...props 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "elevated": 
        return "bg-white shadow-lg border border-gray-100";
      case "outlined": 
        return "bg-white border-2 border-gray-200";
      case "subtle": 
        return "bg-gray-50 border border-gray-200";
      case "transparent": 
        return "bg-transparent border border-gray-300";
      default: 
        return "bg-white shadow-sm border border-gray-200";
    }
  };

  const getInteractionClass = () => {
    if (clickable) {
      return "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300";
    }
    if (hover) {
      return "transition-all duration-200 hover:shadow-md";
    }
    return "";
  };

  const baseClasses = `
    rounded-2xl overflow-hidden
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

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;