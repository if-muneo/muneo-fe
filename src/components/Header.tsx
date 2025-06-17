import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

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

const Navigation = styled.div`
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
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <HeaderContainer>
            <Logo to="/home">
                <img src="/src/assets/logos/logo-header.png" alt="IFMUNEO Logo" />
                <span>IFMUNEO</span>
            </Logo>
            <Navigation>
                <AnimatePresence mode="wait">
                    {isAdminPage ? (
                        <motion.div
                            key="home-button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ display: 'flex', gap: '30px' }}
                        >
                            <NavItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/home">HOME</Link>
                            </NavItem>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="main-nav"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ display: 'flex', gap: '30px' }}
                        >
                            <NavItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/mypage">MYPAGE</Link>
                            </NavItem>
                            <NavItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/admin">ADMIN</Link>
                            </NavItem>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Navigation>
        </HeaderContainer>
    );
};

export default Header;
