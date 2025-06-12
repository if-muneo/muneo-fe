import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  
  img {
    height: 40px;
    width: auto;
  }
  
  span {
    font-weight: 700;
    font-size: 20px;
    color: #000000;
    letter-spacing: 0.5px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled(motion.div)`
  a {
    padding: 8px 16px;
    font-weight: 600;
    color: #000000;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  &:hover a {
    color: #FF0084;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo to="/home">
        <img src="/src/assets/logos/logo-header.png" alt="IFMUNEO Logo" />
        <span>IFMUNEO</span>
      </Logo>
      <Navigation>
        <NavItem 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/mypage">MYPAGE</Link>
        </NavItem>
        <NavItem 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/admin">ADMIN</Link>
        </NavItem>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
