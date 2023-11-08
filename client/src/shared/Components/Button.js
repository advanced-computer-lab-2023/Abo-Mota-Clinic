import React from 'react';

const Button = ({ children, type, onClick, className }) => {
  const baseStyle =
    'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-colors duration-300';
  const typeStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-green-500 hover:bg-green-600',
    danger: 'bg-red-500 hover:bg-red-600',
  };

  const buttonStyle = `${baseStyle} ${typeStyles[type] || typeStyles.primary} ${className}`;

  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
