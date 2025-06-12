import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoGif from '../assets/logos/logo.gif';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const LogoContainer = styled(motion.div)<{ size: string }>`
  width: ${props => {
    switch (props.size) {
      case 'small': return '60px';
      case 'large': return '120px';
      default: return '90px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '60px';
      case 'large': return '120px';
      default: return '90px';
    }
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  return (
    <LogoContainer 
      size={size}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <LogoImage src={logoGif} alt="무너라면 로고" />
    </LogoContainer>
  );
};

export default Logo;
