import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  linkText?: string;
  linkUrl?: string;
}

const SectionContainer = styled.section`
  margin-bottom: 60px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
`;

const ViewMoreLink = styled(motion.create(Link))`
  font-size: 16px;
  font-weight: 600;
  color: #FF007C;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #8247C5;
  }
`;

const Arrow = styled.span`
  margin-left: 4px;
`;

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));  // 핵심!!
    gap: 16px;
    justify-items: center; // 가운데 정렬 (필수 아님, 보기 좋음)
    align-items: center;
`;

const AddOnSection: React.FC<SectionProps> = ({ title, children, linkText, linkUrl = '#' }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        {linkText && (
          <ViewMoreLink 
            to={linkUrl}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {linkText}<Arrow>→</Arrow>
          </ViewMoreLink>
        )}
      </SectionHeader>
      <ContentContainer>
        {children}
      </ContentContainer>
    </SectionContainer>
  );
};

export default AddOnSection;
