import React from 'react';

const Button = ({ children, type = 'primary', onClick, className, isFilled = true, ...props }) => {
  // Tailwind CSS styles for filled buttons
  const filledStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-green-500 hover:bg-green-600 text-white',
    tertiary: 'bg-blue-600 hover:bg-blue-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  // Tailwind CSS styles for outlined buttons
  const outlinedStyles = {
    primary: 'bg-transparent hover:bg-blue-700 text-blue-600 border-blue-600 hover:text-white',
    secondary: 'bg-transparent hover:bg-green-600 text-green-500 border-green-500 hover:text-white',
    tertiary: 'bg-transparent hover:bg-blue-500 text-blue-400 border-blue-400 hover:text-white',
    danger: 'bg-transparent hover:bg-red-700 text-red-600 border-red-600 hover:text-white',
  };

  // Choose the correct Tailwind CSS styles based on the `type` prop and `isFilled` flag
  const buttonStyle = isFilled ? filledStyles[type] || filledStyles.primary : outlinedStyles[type] || outlinedStyles.primary;

  // Base Tailwind CSS styles that apply to all button types
  const baseStyle = `py-2 px-4 rounded transition duration-300 ${isFilled ? '' : 'border'} ${className}`;

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${buttonStyle}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
