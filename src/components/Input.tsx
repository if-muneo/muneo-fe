import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface InputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
}

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
`;

const StyledInput = styled(motion.input)`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #ffffff;
  color: #333333;
  font-family: 'Noto Sans KR', sans-serif;
  
  &:focus {
    border-color: #FF0084;
    box-shadow: 0 0 0 2px rgba(255, 0, 132, 0.1);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333333;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
`;

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  label,
  value,
  onChange,
  required = false,
  name
}) => {
  // 폼 유효성 관리를 위한 상태는 필요할 때 추가해주기
  
  return (
    <InputContainer>
      {label && (
        <Label>
          {label} {required && <span style={{ color: '#FF0084' }}>*</span>}
        </Label>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </InputContainer>
  );
};

export default Input;
