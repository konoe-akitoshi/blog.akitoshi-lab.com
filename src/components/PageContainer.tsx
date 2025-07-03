import { ReactNode } from 'react';

type MaxWidth = "sm" | "md" | "lg" | "xl" | "full" | "default";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: MaxWidth;
  className?: string;
}

const PageContainer = ({ children, maxWidth = "default", className = "" }: PageContainerProps) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm": return "max-w-2xl";
      case "md": return "max-w-4xl";
      case "lg": return "max-w-6xl";
      case "xl": return "max-w-7xl";
      case "full": return "max-w-full";
      default: return "max-w-4xl";
    }
  };

  return (
    <div className={`${getMaxWidthClass()} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;