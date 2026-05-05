import { ReactNode } from 'react';

type IconProps = {
  icon: ReactNode;
  size?: number;
  className?: string;
};

export const Icon = ({ icon, size = 5, className }: IconProps) => {
  const baseClasses = 'flex items-center justify-center transition-colors duration-300 stroke-current';
  const sizeClasses = size === 6 ? 'h-6 w-6' : 'h-5 w-5';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${className || ''}`}>
      {icon}
    </span>
  );
};