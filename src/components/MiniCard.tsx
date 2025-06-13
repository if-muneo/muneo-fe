// components/MiniCard.tsx

import React from 'react';
import styled from 'styled-components';

interface MiniCardProps {
    title: string;
    icon: string;
    onClick?: () => void;
}

const CardWrapper = styled.div`
  background-color: #FFF6D1;
  border-radius: 16px;
  width: 180px;
  height: 180px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease;
    flex: 0 0 auto;

    &:hover {
    transform: translateY(-4px);
  }
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: #333;
`;

const MiniCard: React.FC<MiniCardProps> = ({ title, icon, onClick }) => {
    return (
        <CardWrapper onClick={onClick}>
            <Icon src={icon} alt={title} />
            <Title>{title}</Title>
        </CardWrapper>
    );
};

export default MiniCard;
