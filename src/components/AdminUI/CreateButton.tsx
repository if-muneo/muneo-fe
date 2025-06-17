import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export interface CreateButtonProps {
  label: string;
  onClick?: () => void;
}

export const StyledButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: linear-gradient(135deg, #FF007C 0%, #E60074 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 8px 15px rgba(230, 0, 116, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px rgba(230, 0, 116, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(230, 0, 116, 0.15);
  }
  
  &::before {
    content: "+";
    margin-right: 8px;
    margin-bottom: 3px;
    font-size: 16px;
  }
`;

const CreateButton: React.FC<CreateButtonProps> = ({ label, onClick }) => {
  return (
    <StyledButton
      as={motion.button}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};

export default CreateButton;
