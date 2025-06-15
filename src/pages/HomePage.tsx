import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Section from '../components/Section';
import Card from '../components/Card';
import ChatModal from "./ChatModal.tsx";


interface CardData {
  title: string;
  description: string;
  icon: string;
  color: string;
  iconType?: 'gift' | 'heart' | 'rocket';
}

import giftIcon from '../assets/icons/icon1.png';
import heartIcon from '../assets/icons/icon3.png';
import rocketIcon from '../assets/icons/icon4.png';
import logoGif from '../assets/logos/logo.gif';
import netflix from '../assets/icons/iconNetflix.png';
import lock from '../assets/icons/iconLock.png';
import call from '../assets/icons/iconCall.png';
import handphone from '../assets/icons/iconHandphone.png';
import discount from '../assets/icons/iconDiscount.png';
import MiniCard from "../components/MiniCard.tsx";
import AddOnSection from "../components/AddOnSection.tsx";

const PageContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background-color: #FFFFFF;
`;

const ContentContainer = styled(motion.div)`
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 0 24px 40px;
`;

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #F7E784;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(220, 180, 0, 0.35);
  z-index: 1000;
  overflow: hidden;
`;

const HomePage: React.FC = () => {
  const planCards: CardData[] = [
    {
      title: "5G 프리미어 에센셜",
      description: "최고급 데이터, 통화 옵션",
      icon: heartIcon,
      color: "linear-gradient(146.52deg, #FBE7E7 13.34%, #F2B7B7 100.61%)"
    },
    {
      title: "5G 스탠다드",
      description: "균형 잡힌 데이터, 음성 요금제",
      icon: rocketIcon,
      color: "linear-gradient(167.88deg, #EFEAFB 13.82%, #DACBFF 96.65%)"
    },
    {
      title: "5G 심플+",
      description: "합리적 가격의 기본 서비스",
      icon: giftIcon,
      color: "linear-gradient(157.89deg, #F3D6F8 17.72%, #D376E5 135.78%)",
      iconType: "gift"
    }
  ];

  const addonCards: CardData[] = [
    {
      title: "미디어",
      description: "Netflix 등 미디어 서비스",
      icon: netflix, // 실제 아이콘 경로로 변경
      color: "#FFF6D1"
    },
    {
      title: "보안",
      description: "보안 서비스 이용",
      icon: lock,
      color: "#FFF6D1"
    },
    {
      title: "기기 할부",
      description: "기기 분할 납부 혜택",
      icon: handphone,
      color: "#FFF6D1"
    },
    {
      title: "할인",
      description: "요금 할인 및 프로모션",
      icon: discount,
      color: "#FFF6D1"
    },
    {
      title: "통화",
      description: "무제한 통화 등 혜택",
      icon: call,
      color: "#FFF6D1"
    }
  ];

  const [showChat, setShowChat] = useState(false);


  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <ContentContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Banner autoSlideInterval={3000} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Section
            title="주요 5G 요금제를 확인해보세요" 
            linkText="더 많은 요금제 구경하기"
            linkUrl="/plans"
          >
          {planCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              color={card.color}
              iconType={card.iconType}
            />
          ))}
        </Section>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <AddOnSection
              title="다양한 부가서비스를 경험해보세요"
              linkText="이용 가능한 부가서비스 구경하기"
              linkUrl="/addons"
          >
            {addonCards.map((card, index) => (
                <MiniCard
                    key={index}
                    title={card.title}
                    icon={card.icon}
                />
            ))}
          </AddOnSection>
        </motion.div>
      </ContentContainer>
      
      <FloatingButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => setShowChat(true)}
      >
        <img src={logoGif} alt="무너 로고" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </FloatingButton>
      {showChat && <ChatModal onClose={() => setShowChat(false)} />}
    </PageContainer>
  );
};

export default HomePage;
