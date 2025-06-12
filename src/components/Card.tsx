import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description?: string;
  icon: string;
  color: string;
  iconType?: 'gift' | 'heart' | 'rocket';
}

const CardContainer = styled(motion.div)<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor};
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

const IconContainerBase = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegularIconContainer = styled(IconContainerBase)`
  width: 180px;
  height: 180px;
  
  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
    margin: auto;
  }
`;

const GiftIconContainer = styled(IconContainerBase)`
  width: 180px;
  height: 180px;
  
  img {
    width: 170px;
    height: 170px;
    object-fit: contain;
    margin: auto;
    transform: scale(1.2);
  }
`;

const Title = styled.h1`
  margin-top: 30px;
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  text-align: left;
  align-self: flex-start;
`;

const Description = styled.p`
  font-size: 14px;
  color: #000000;
  opacity: 0.7;
  margin-top: 8px;
  text-align: left;
  align-self: flex-start;
`;

const Card: React.FC<CardProps> = ({ title, description, icon, color, iconType }) => {
  const isGift = iconType === 'gift';
  return (
    <CardContainer 
      bgColor={color}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {isGift ? (
        <GiftIconContainer>
          <img src={icon} alt={`${title} icon`} />
        </GiftIconContainer>
      ) : (
        <RegularIconContainer>
          <img src={icon} alt={`${title} icon`} />
        </RegularIconContainer>
      )}
    </CardContainer>
  );
};

export default Card;
