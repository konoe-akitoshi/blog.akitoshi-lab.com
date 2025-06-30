const Section = ({ 
  children, 
  variant = "default", 
  spacing = "default",
  className = "" 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary": return "bg-white shadow-sm border border-gray-100";
      case "secondary": return "bg-gray-50 border border-gray-200";
      case "highlight": return "bg-blue-50 border border-blue-200";
      case "transparent": return "bg-transparent";
      default: return "bg-white";
    }
  };

  const getSpacingClass = () => {
    switch (spacing) {
      case "sm": return "py-4 px-4";
      case "md": return "py-6 px-6";
      case "lg": return "py-8 px-8";
      case "xl": return "py-12 px-8";
      case "none": return "";
      default: return "py-6 px-6";
    }
  };

  return (
    <section className={`${getVariantClass()} ${getSpacingClass()} rounded-lg ${className}`}>
      {children}
    </section>
  );
};

export default Section;