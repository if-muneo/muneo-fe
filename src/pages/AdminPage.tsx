import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Header from '../components/Header';

const AdminPageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px;
  width: 100%;
  margin: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,241,248,0.4) 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #FF007C, #9C27B0, #3F51B5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
`;

const Title = styled(motion.h1)`
  font-size: 56px;
  font-weight: 900;
  color: transparent;
  background: linear-gradient(135deg, #FF007C 0%, #E60074 100%);
  background-clip: text;
  -webkit-background-clip: text;
  margin-bottom: 40px;
  letter-spacing: -1px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #FF007C, #E60074);
    border-radius: 2px;
  }
`;

const DescriptionBox = styled(motion.div)`
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 32px 40px;
  margin-bottom: 60px;
  text-align: center;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px rgba(255, 0, 124, 0.08), 0 6px 10px rgba(0, 0, 0, 0.04);
  position: relative;
  background-image: linear-gradient(white, white), linear-gradient(135deg, #FF007C, #E60074);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  
  p {
    font-size: 18px;
    color: #444;
    line-height: 1.7;
    margin: 0;
    font-weight: 500;
  }
  
  strong {
    color: #E60074;
    font-weight: 700;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 32px;
  margin-top: 10px;
`;

const AdminButton = styled(Button)`
  background: #FFF1F8;
  color: #E60074;
  border: 2px solid transparent;
  border-radius: 14px;
  font-weight: 700;
  padding: 16px 32px;
  box-shadow: 0 8px 15px rgba(230, 0, 116, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: #FFE9F4;
    transform: translateY(-3px);
    box-shadow: 0 12px 20px rgba(230, 0, 116, 0.12);
    border-color: rgba(230, 0, 116, 0.1);
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(230, 0, 116, 0.1);
  }
`;

const AdminPage: React.FC = () => {
  return (
    <>
      <Header />
      <AdminPageContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", damping: 12 }}
      >
        ADMIN
      </Title>
      <DescriptionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, type: "spring", damping: 12 }}
      >
        <p>
          <strong>IFMUNEO</strong>의 U+ 요금제 데이터를 관리하는 어드민 페이지입니다!
          <br />
          하단의 원하시는 작업을 선택해주세요
        </p>
      </DescriptionBox>
      <ButtonContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <AdminButton 
          size="large" 
          primary={false}
          as={motion.button}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          부가서비스 만들기
        </AdminButton>
        <AdminButton 
          size="large" 
          primary={false}
          as={motion.button}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          부가서비스 그룹 만들기
        </AdminButton>
        <AdminButton 
          size="large" 
          primary={false}
          as={motion.button}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          요금제 만들기
        </AdminButton>
      </ButtonContainer>
          </AdminPageContainer>
    </>
  );
};

export default AdminPage;
