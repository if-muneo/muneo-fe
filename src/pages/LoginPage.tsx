import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import api from "../util/axios.ts";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: white;
`;

const LoginContainer = styled(motion.div)`
  max-width: 400px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled(motion.div)`
  margin-bottom: 40px;
`;

const Title = styled(motion.h1)`
  font-size: 28px;
  color: #000000;
  margin: 0 0 40px;
  font-weight: 700;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const ForgotPassword = styled(motion.a)`
  font-size: 14px;
  color: #8247C5;
  margin-top: 24px;
  text-align: center;
  cursor: pointer;
  display: block;
  font-weight: 500;
  text-decoration: none;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      // 로그인 성공하면 사용자 이름/역할 저장
       localStorage.setItem("username", res.data.name);
      localStorage.setItem("role",  res.data.role);
      navigate("/home");
    } catch (error) {
      console.error('로그인 실패:', error);
     console.log(error);
    }
  };
  
  return (
    <PageContainer>
      <LoginContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LogoContainer
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Logo size="medium" />
        </LogoContainer>
        
        <Title
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          로그인
        </Title>
        
        <Form onSubmit={handleSubmit} >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Input 
              label="이메일"
              placeholder="이메일를 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Input 
              type="password" 
              label="비밀번호" 
              placeholder="비밀번호를 입력해주세요" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </motion.div>
          
          <ButtonContainer>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                primary
                size="medium"
                type="submit"
                style={{ width: '100%' }}
              >
                로그인
              </Button>
            </motion.div>
          </ButtonContainer>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <ForgotPassword href="#">
              비밀번호를 잊어버리셨나요?
            </ForgotPassword>
          </motion.div>
        </Form>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;
