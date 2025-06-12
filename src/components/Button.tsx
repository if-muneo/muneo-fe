import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  className?: string;
}

const StyledButton = styled(motion.button)<{ primary: boolean; size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  
  background: ${props => 
    props.primary ? 'linear-gradient(to right, #FF0084, #8247C5)' : 'transparent'};
  color: ${props => 
    props.primary ? '#FFFFFF' : '#FF0084'};
  border: ${props => 
    props.primary ? 'none' : '2px solid #FF0084'};
    
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 20px';
      case 'large': return '14px 40px';
      default: return '12px 30px';
    }
  }};
  
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  
  transition: transform 0.2s ease;
  box-shadow: ${props => props.primary ? '0 4px 10px rgba(255, 0, 132, 0.3)' : 'none'};
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  primary = true, 
  size = 'medium', 
  children, 
  onClick,
  type = 'button',
  style,
  className
}) => {
  return (
    <StyledButton
      primary={primary}
      size={size}
      onClick={onClick}
      type={type}
      style={style}
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
