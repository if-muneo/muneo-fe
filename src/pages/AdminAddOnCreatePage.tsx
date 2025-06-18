import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Header from '../components/Header';
import api from "../util/axios.ts";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
`;

const PageContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,241,248,0.4) 100%);
`;

const FormContainer = styled(motion.form)`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin: 40px auto;
`;

const PageTitle = styled(motion.h1)`
  font-size: 28px;
  font-weight: 700;
  margin-top: 40px;
  text-align: center;
  color: #E60074;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #000;
  font-size: 16px;
  transition: border 0.2s ease;
  background-color: #FFF0F7;
  
  &:focus {
    outline: none;
    border-color: #FF0084;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #000;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  background-color: #FFF0F7;
  
  &:focus {
    outline: none;
    border-color: #FF0084;
  }
`;

const TypeToggleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
`;

const TypeToggleButton = styled.button<{ $isSelected: boolean }>`
  padding: 10px 16px;
  border-radius: 50px;
  border: ${props => props.$isSelected ? 'none' : '1px solid #e0e0e0'};
  background: ${props => props.$isSelected ? '#FFF1F8' : 'white'};
  color: ${props => props.$isSelected ? '#E60074' : '#333'};
  font-weight: ${props => props.$isSelected ? '600' : 'normal'};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    border-color: rgba(230, 0, 116, 0.1);
  }
`;

const CreateButton = styled(Button)`
  background: #FFF1F8;
  color: #E60074;
  border: 2px solid transparent;
  font-weight: 700;
  padding: 16px 32px;
  box-shadow: 0 8px 15px rgba(230, 0, 116, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  justify-content: center;
`;

type AddonType = 'MEDIA' | 'CALL' | 'SALE' | 'SAFE' | 'CONVENIENCE';

const AdminAddOnCreatePage = () => {
  const navigate = useNavigate();
  
  // type 초기값은 우선 빈 문자열로 설정하고 선택하면 AddonType으로 변경
  interface FormData {
    name: string;
    addonType: AddonType | '';
    description: string;
    price: string;
    imageUrl: string;
  }
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    addonType: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTypeSelection = (type: AddonType) => {
    setFormData({
      ...formData,
      addonType: type,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 데이터 처리 로직

    await api.post("/v1/addon",
        {
          "name": formData.name,
          "description": formData.description,
          "price": Number(formData.price),
          "addonType": formData.addonType
        });

    console.log('제출된 폼 데이터:', formData);

    // 제출 후에는 목록 페이지로 돌아가기
    navigate('/admin/services');
  };
  
  return (
    <PageContainer>
      <Header />
      <PageTitle
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          부가서비스 만들기
        </PageTitle>
      <PageContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormContainer 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >

        <FormGroup>
          <Label>부가서비스 이름</Label>
          <Input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="부가서비스 이름을 입력해주세요"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>부가서비스 타입</Label>
          <TypeToggleContainer>
            <TypeToggleButton 
              $isSelected={formData.addonType === 'MEDIA'}
              type="button"
              onClick={() => handleTypeSelection('MEDIA')}
            >
              미디어
            </TypeToggleButton>
            <TypeToggleButton 
              $isSelected={formData.addonType === 'CALL'}
              type="button"
              onClick={() => handleTypeSelection('CALL')}
            >
              통화
            </TypeToggleButton>
            <TypeToggleButton 
              $isSelected={formData.addonType === 'SALE'}
              type="button"
              onClick={() => handleTypeSelection('SALE')}
            >
              할인
            </TypeToggleButton>
            <TypeToggleButton 
              $isSelected={formData.addonType === 'SAFE'}
              type="button"
              onClick={() => handleTypeSelection('SAFE')}
            >
              보안
            </TypeToggleButton>
            <TypeToggleButton 
              $isSelected={formData.addonType === 'CONVENIENCE'}
              type="button"
              onClick={() => handleTypeSelection('CONVENIENCE')}
            >
              편의
            </TypeToggleButton>
          </TypeToggleContainer>
        </FormGroup>
        
        <FormGroup>
          <Label>가격</Label>
          <Input 
            type="text" 
            name="price" 
            value={formData.price || ''} 
            onChange={handleInputChange} 
            placeholder="가격을 입력해주세요"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>설명</Label>
          <TextArea 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="부가서비스에 대한 설명을 입력해주세요"
            rows={5}
          />
        </FormGroup>
        
        <ButtonGroup>
          <CreateButton 
            type="submit"
            primary={true}
            size="medium"
          >
            부가서비스 만들기
          </CreateButton>
          <Button 
            type="button"
            primary={false}
            size="medium"
            onClick={() => navigate('/admin/services')}
          >
            취소
          </Button>
        </ButtonGroup>
      </FormContainer>
      </PageContent>
    </PageContainer>
  );
};

export default AdminAddOnCreatePage;
