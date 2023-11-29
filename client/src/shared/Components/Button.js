import React from 'react';
import { Button as JoyButton } from '@mui/joy';

const Button = ({ children, type, onClick, className, isFilled = true, htmlFor, ...props })=> {
  const baseStyle = {
    color: isFilled ? 'white' : '#0056b3', // Text color changes based on isFilled
    py: 1, // Padding Y-axis
    px: 2, // Padding X-axis
    borderRadius: 'sm', // Small border radius
    transition: 'colors 0.3s', // Smooth color transition
    border: !isFilled ? '1px solid' : 'none', // Border for outlined button
    '&:hover': {
      boxShadow: 'md', // Medium shadow on hover
    },
    '&:focus': {
      outline: 'none',
      boxShadow: 'outline', // Focus outline shadow
    },
  };

  const typeStyles = {
    primary: {
      bgcolor: isFilled ? '#0056b3' : 'transparent', // Background color changes based on isFilled
      '&:hover': {
        bgcolor: isFilled ? '#003d82' : '#e6f0ff', // Hover color for outlined button
      },
    },
    secondary: {
      bgcolor: isFilled ? '#28a745' : 'transparent', 
      '&:hover': {
        bgcolor: isFilled ? '#1e7e34' : '#ecf4eb', // Hover color for outlined secondary button
      },
    },
    danger: {
      bgcolor: isFilled ? '#dc3545' : 'transparent', 
      '&:hover': {
        bgcolor: isFilled ? '#c82333' : '#f8e3e7', // Hover color for outlined danger button
      },
    },
  };

  const buttonStyle = { ...baseStyle, ...typeStyles[type] || typeStyles.primary };

  return (
    <JoyButton sx={buttonStyle} onClick={onClick} className={className} {...props} component={htmlFor ? 'label' : 'button'} htmlFor={htmlFor}>
      {children}
    </JoyButton>
  );
  
};

export default Button;
