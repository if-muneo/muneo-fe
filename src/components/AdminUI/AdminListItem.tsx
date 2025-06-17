import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export interface AdminListItemProps {
  children: ReactNode;
  index: number;
}

export const StyledItem = styled(motion.div)`
  padding: 22px 30px;
  font-size: 17px;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: #333;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  height: 70px;
  justify-content: space-between;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #FFF1F8;
    color: #E60074;
  }
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, rgba(255, 0, 124, 0.2), transparent);
    transition: width 0.3s ease;
  }
  
  &:hover::before {
    width: 5px;
  }
`;

const AdminListItem: React.FC<AdminListItemProps> = ({ children, index }) => {
  return (
    <StyledItem
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * (index + 1), duration: 0.3 }}
    >
      {children}
    </StyledItem>
  );
};

export default AdminListItem;
