import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Header from '../components/Header';
import api from "../util/axios.ts";
// import { 임시_부가서비스_데이터 } from '../models/AddOnModels';
// import type { AddonResponse } from '../models/AddOnModels';

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
  max-width: 800px;
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

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const SearchInput = styled(Input)`
  flex: 1;
`;

const SearchButton = styled(Button)`
  flex-shrink: 0;
  background: #E60074;
  color: white;
  padding: 12px 20px;
  font-weight: 600;
  border: none;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(230, 0, 116, 0.2);
  }
`;

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ServicesSection = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  min-height: 120px;
  max-height: 200px;
  overflow-y: auto;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: #FFF8FB;
  border-radius: 6px;
  border-left: 3px solid #E60074;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(230, 0, 116, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ServiceName = styled.span`
  font-weight: 500;
`;

const ServiceId = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: 8px;
`;

const ActionButton = styled.button<{ $variant: 'add' | 'remove' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 10px;
  border: none;
  background-color: ${props => props.$variant === 'add' ? '#E60074' : '#ff6b6b'};
  color: white;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: all 0.2s ease;
  
  &::before {
    content: "${props => props.$variant === 'add' ? '+' : '—'}";
    line-height: 0;
    margin-bottom: 3px;
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 6px ${props => props.$variant === 'add' 
      ? 'rgba(230, 0, 116, 0.3)' 
      : 'rgba(255, 107, 107, 0.3)'};
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

interface AddonResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  addonType: AddonType;
}

const AdminAddOnGroupCreatePage = () => {
  const navigate = useNavigate();
  
  const [groupName, setGroupName] = useState('');
  const [searchService, setSearchService] = useState('');
  const [searchResults, setSearchResults] = useState<AddonResponse[]>([]);
  const [selectedService, setSelectedServices] = useState<AddonResponse[]>([]);
  
  // 검색 기능
  const handleSearch = async  () => {

    if (!searchService.trim()) {
      setSearchResults([]);
      return;
    }
    
    // ID나 이름으로 정확히 검색
    const res = await api.get(`/v1/addon/${searchService}`, );
    console.log(res);
    const result = res.data.data;
    const resultsArray = Array.isArray(result) ? result : [result];

    // 이미 선택한 서비스는 제외
    const filteredResults = resultsArray.filter((s: AddonResponse) => {
      return !selectedService.some((service: AddonResponse) => service.id === s.id);
    });
    
    setSearchResults(filteredResults);
  };
  
  // 서비스 추가하기
  const addService = (service: AddonResponse) => {
    setSelectedServices(prev => [...prev, service]);
    setSearchResults(prev => prev.filter(item => item.id !== service.id));
  };
  
  // 서비스 제거하기
  const removeService = (serviceId: number) => {
    // 선택된 서비스에서 제거
    setSelectedServices(prev => prev.filter((service: AddonResponse) => service.id !== serviceId));
  };
  
  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 입력 확인
    if (!groupName.trim()) {
      alert('그룹명은 필수 입력 항목이에요');
      return;
    }
    
    if (selectedService.length === 0) {
      alert('최소 하나 이상의 부가서비스를 선택해주세요.');
      return;
    }
    
    // 데이터 제출
    const submitData = {
      name: groupName,
      services: selectedService.map(addOnService => addOnService.id),
    };

    await api.post("/v1/addon-group",
        {
          name: groupName,
          addonsCreateRequest: selectedService.map(addOnService => addOnService.id),
        })
    
    console.log('제출된 데이터:', submitData);
    
    // 저장 완료 후 리스트 페이지로 이동
    navigate('/admin/groups');
  };
  
  return (
    <PageContainer>
      <Header />
      <PageTitle
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        부가서비스 그룹 만들기
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
            <Label>부가서비스 그룹명</Label>
            <Input 
              type="text" 
              value={groupName} 
              onChange={(e) => setGroupName(e.target.value)} 
              placeholder="그룹 이름을 입력해주세요"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>부가서비스 검색</Label>
            <SearchContainer>
              <SearchInput 
                type="text" 
                value={searchService}
                onChange={(e) => setSearchService(e.target.value)}
                placeholder="부가서비스 이름 또는 ID를 입력해주세요" 
              />
              <SearchButton 
                type="button"
                primary={true}
                size="small"
                onClick={handleSearch}
              >
                검색
              </SearchButton>
            </SearchContainer>
          </FormGroup>
          
          <ServicesContainer>
            <FormGroup>
              <Label>검색 결과</Label>
              <ServicesSection>
                {searchResults.length === 0 ? (
                  <div style={{ padding: '16px', color: '#777', textAlign: 'center' }}>
                    검색 결과가 없어요
                  </div>
                ) : (
                  searchResults.map(service => (
                    <ServiceItem key={service.id}>
                      <div>
                        <ServiceName>{service.name}</ServiceName>
                        <ServiceId>(ID: {service.id})</ServiceId>
                      </div>
                      <ActionButton 
                        type="button" 
                        $variant="add" 
                        onClick={() => addService(service)}
                      />
                    </ServiceItem>
                  ))
                )}
              </ServicesSection>
            </FormGroup>
            
            <FormGroup>
              <Label>선택된 부가서비스</Label>
              <ServicesSection>
                {selectedService.length === 0 ? (
                  <div style={{ padding: '16px', color: '#777', textAlign: 'center' }}>
                    선택된 부가서비스가 없어요
                  </div>
                ) : (
                    selectedService.map(addOnService => (
                    <ServiceItem key={addOnService.id}>
                      <div>
                        <ServiceName>{addOnService.name}</ServiceName>
                        <ServiceId>(ID: {addOnService.id})</ServiceId>
                      </div>
                      <ActionButton 
                        type="button" 
                        $variant="remove" 
                        onClick={() => removeService(addOnService.id)}
                      />
                    </ServiceItem>
                  ))
                )}
              </ServicesSection>
            </FormGroup>
          </ServicesContainer>
          
          <ButtonGroup>
            <CreateButton 
              type="submit"
              primary={true}
              size="medium"
            >
              그룹 만들기
            </CreateButton>
            <Button 
              type="button"
              primary={false}
              size="medium"
              onClick={() => navigate('/admin/groups')}
            >
              취소
            </Button>
          </ButtonGroup>
        </FormContainer>
      </PageContent>
    </PageContainer>
  );
};

export default AdminAddOnGroupCreatePage;
