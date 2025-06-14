import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: white;
  overflow: hidden;
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 0 20px;
`;

const LogoWrapper = styled(motion.div)`
  margin-bottom: 24px;
`;

const TitleWrapper = styled(motion.div)`
  margin-bottom: 48px;
`;

const TopText = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #FF0084;
  display: block;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

const ButtonWrapper = styled(motion.div)`
  margin-top: 24px;
`;

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  localStorage.clear();
  
  const handleStart = () => {
    navigate('/login');
  };

  return (
    <PageContainer>
      <ContentContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LogoWrapper
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Logo size="large" />
        </LogoWrapper>
        
        <TitleWrapper
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <TopText>U+ 요금제를 한눈에</TopText>
          <Title>무너라면</Title>
        </TitleWrapper>
        
        <ButtonWrapper
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button primary size="large" onClick={handleStart}>
            시작하기
          </Button>
        </ButtonWrapper>
      </ContentContainer>
    </PageContainer>
  );
};

export default StartPage;
