import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../Header';

export interface AdminListLayoutProps {
  title: string;
  createButtonComponent?: ReactNode;
  children: ReactNode;
}

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const PageContent = styled(motion.div)`
  padding: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,241,248,0.4) 100%);
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const PageTitle = styled(motion.h1)`
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  color: transparent;
  background: linear-gradient(135deg, #FF007C 0%, #E60074 100%);
  background-clip: text;
  -webkit-background-clip: text;
  position: relative;
`;

export const ServiceList = styled(motion.div)`
  margin: 30px 0;
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 30px rgba(255, 0, 124, 0.05), 0 6px 10px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  width: 100%;
`;

const AdminListLayout: React.FC<AdminListLayoutProps> = ({ 
  title, 
  createButtonComponent, 
  children 
}) => {
  return (
    <Container>
      <Header />
      <PageContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderContainer>
          <TitleRow>
            <PageTitle
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {title}
            </PageTitle>
            
            {createButtonComponent}
          </TitleRow>
        </HeaderContainer>
        
        <ServiceList
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {children}
        </ServiceList>
      </PageContent>
    </Container>
  );
};

export default AdminListLayout;
