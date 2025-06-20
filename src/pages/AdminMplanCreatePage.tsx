import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Header from '../components/Header';
import api from "../util/axios.ts";
import Modal from "../components/Modal.tsx";

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
  max-width: 960px;
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
`;

const ServiceName = styled.span`
  font-weight: 500;
`;

const ActionButton = styled.button<{ $variant: 'add' | 'remove' }>`
  padding: 4px 12px;
  border-radius: 6px;
  border: none;
  background-color: ${props => props.$variant === 'add' ? '#E60074' : '#ff6b6b'};
  color: white;
  cursor: pointer;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  justify-content: center;
  grid-column: 1 / -1;
`;

const CreateButton = styled(Button)`
  background: #FFF1F8;
  color: #E60074;
  font-weight: 700;
  padding: 16px 32px;
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


// interface AddonGroup {
//   addonGroupId: number;
//   addonGroupName: string;
// }

interface AddonGroup {
  id: number;
  name: string;
}


type MplanType = 'LTE_5G' | 'NUGGET' | 'SMART_DEVICE';
type DataType = '_5G' | 'LTE' ;
type Qualification = 'ALL' | 'OLD' | 'WELFARE' | 'BOY' | 'SOLDIER' | 'KID';

const AdminMplanCreatePage = () => {
  const navigate = useNavigate();

  // type 초기값은 우선 빈 문자열로 설정하고 선택하면 해당Type으로 변경
  interface FormData {
    name: '',
    monthlyPrice: number,
    mplanType: MplanType | '',
    dataType: DataType | '',
    basicDataAmount: number,
    sharingData: number,
    dailyData: number,
    subDataSpeed: number,
    voiceCallVolume: number,
    textMessage: boolean,
    qualification: Qualification | '',
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    monthlyPrice: 0,
    mplanType: '',
    dataType: '',
    basicDataAmount: 0,
    sharingData: 0,
    dailyData: 0,
    subDataSpeed: 0,
    voiceCallVolume: 0,
    textMessage: false,
    qualification: '',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchGroup, setSearchGroup] = useState('');
  const [searchResults, setSearchResults] = useState<AddonGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<AddonGroup | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDataTypeSelection = (type: DataType ) => {
    setFormData({
      ...formData,
      dataType: type,
    });
  };

  const handleMplanTypeSelection = (type: MplanType ) => {
    setFormData({
      ...formData,
      mplanType: type,
    });
  };

  const handleQualificationTypeSelection = (type: Qualification ) => {
    setFormData({
      ...formData,
      qualification: type,
    });
  };

  const handleSearch = async () => {
    if (!searchGroup.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      // ID로 검색
      const res = await api.get(`/v1/addon-group/${searchGroup}`);
      console.log(res);
      const foundGroups = res.data.data;

      console.log(foundGroups);

      if (selectedGroup && foundGroups.some((g: AddonGroup) => g.id === selectedGroup.id)) {
        setSearchResults([]);
      } else {
       //  setSearchResults(foundGroups);
        setSearchResults(foundGroups ? [foundGroups] : []);
      }
    } catch (error) {
      console.error('부가서비스 그룹 검색 실패:', error);
      setSearchResults([]);
    }
  };

  const selectGroup = (group: AddonGroup) => {
    setSelectedGroup(group);
    setSearchResults([]);
    setSearchGroup('');
  };

  const removeGroup = () => {
    setSelectedGroup(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.monthlyPrice || !formData.basicDataAmount || !formData.mplanType || !formData.dataType) {
      setModalMessage("필수 항목을 모두 입력해주세요.");
      setShowModal(true);
      return;
    }
    
    setLoading(true);
    
    const submissionData = {
      name: formData.name,
      monthlyPrice: Number(formData.monthlyPrice) || 0,
      mplanType: formData.mplanType.toUpperCase(),
      dataType: formData.dataType.toUpperCase(),
      basicDataAmount: (Number(formData.basicDataAmount) || 0) * 1000,
      sharingData: Number(formData.sharingData) || 0,
      dailyData: Number(formData.dailyData) || 0,
      subDataSpeed: Number(formData.subDataSpeed) || 0,
      voiceCallVolume: Number(formData.voiceCallVolume) || 0,
      textMessage: formData.textMessage,
      qualification: formData.qualification.toUpperCase(),
      addonGroupRequest: selectedGroup ? { id: selectedGroup.id } : null,
    };

   try {
      await api.post("/v1/mplan", submissionData);
      setModalMessage("요금제가 성공적으로 생성되었습니다.");
      setShowModal(true);
    } catch (error) {
      console.error('요금제 생성 실패:', error);
      setModalMessage("요금제 생성 중 오류가 발생했습니다.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <Header />
      <PageContent>
        <PageTitle>요금제 만들기</PageTitle>
        <FormContainer onSubmit={handleSubmit}>
          <FormGrid>
            <div>
              <FormGroup>
                <Label>요금제 이름 *</Label>
                <Input name="name" value={formData.name} onChange={handleInputChange} required />
              </FormGroup>

              <FormGroup>
                <Label>월정액 (원) *</Label>
                <Input name="monthlyPrice" type="number" value={formData.monthlyPrice} onChange={handleInputChange} required />
              </FormGroup>

              <FormGroup>
                <Label>요금제 타입 *</Label>
                <TypeToggleContainer>
                  <TypeToggleButton
                      $isSelected={formData.mplanType === 'LTE_5G'}
                      type="button"
                      onClick={() => handleMplanTypeSelection('LTE_5G')}
                  >
                    LTE_5G
                  </TypeToggleButton>
                  <TypeToggleButton
                      $isSelected={formData.mplanType === 'NUGGET'}
                      type="button"
                      onClick={() => handleMplanTypeSelection('NUGGET')}
                  >
                    NUGGET
                  </TypeToggleButton>
                  <TypeToggleButton
                      $isSelected={formData.mplanType === 'SMART_DEVICE'}
                      type="button"
                      onClick={() => handleMplanTypeSelection('SMART_DEVICE')}
                  >
                    SMART_DEVICE
                  </TypeToggleButton>
                  </TypeToggleContainer>
                {/*<Input name="mplanType" value={formData.mplanType} onChange={handleInputChange} placeholder="예: BASIC" required />*/}
              </FormGroup>

              <FormGroup>
                <Label>데이터 타입 *</Label>
                <TypeToggleContainer>
                <TypeToggleButton
                    $isSelected={formData.dataType === '_5G'}
                    type="button"
                    onClick={() => handleDataTypeSelection('_5G')}
                >
                  5G
                </TypeToggleButton>
                  <TypeToggleButton
                      $isSelected={formData.dataType === 'LTE'}
                      type="button"
                      onClick={() => handleDataTypeSelection('LTE')}
                  >
                    LTE
                  </TypeToggleButton>
                  </TypeToggleContainer>
                {/*<Input name="dataType" value={formData.dataType} onChange={handleInputChange} placeholder="예: 5G" required />*/}
              </FormGroup>

              <FormGroup>
                <Label>제공 데이터 (MB) *</Label>
                <Input name="basicDataAmount" type="number" value={formData.basicDataAmount} onChange={handleInputChange} required step="0.1" />
              </FormGroup>

              <FormGroup>
                <Label>공유 데이터 (MB)</Label>
                <Input name="sharingData" type="number" value={formData.sharingData} onChange={handleInputChange} />
              </FormGroup>

              <FormGroup>
                <Label>서브 데이터 속도 (Mbps)</Label>
                <Input name="subDataSpeed" type="number" value={formData.subDataSpeed} onChange={handleInputChange} />
              </FormGroup>

              <FormGroup>
                <Label>문자</Label>
                <TypeToggleContainer>
                  <TypeToggleButton
                      type="button"
                      $isSelected={formData.textMessage === true}
                      onClick={() => setFormData(prev => ({ ...prev, textMessage: true }))}
                  >
                    제공
                  </TypeToggleButton>
                  <TypeToggleButton
                      type="button"
                      $isSelected={formData.textMessage === false}
                      onClick={() => setFormData(prev => ({ ...prev, textMessage: false }))}
                  >
                    미제공
                  </TypeToggleButton>
                </TypeToggleContainer>
                {/*<Input name="textMessage" value={formData.textMessage} onChange={handleInputChange} placeholder="예: 기본 제공"/>*/}
              </FormGroup>

              <FormGroup>
                <Label>통화량 (분)</Label>
                <Input name="voiceCallVolume" type="number" value={formData.voiceCallVolume} onChange={handleInputChange}/>
              </FormGroup>

              <FormGroup>
                <Label>가입자격</Label>
                {/*<Input name="qualification" value={formData.qualification} onChange={handleInputChange}/>*/}
                <TypeToggleContainer>
                  <TypeToggleButton
                      $isSelected={formData.qualification === 'ALL'}
                      type="button"
                      onClick={() => handleQualificationTypeSelection('ALL')}
                  >
                    ALL
                  </TypeToggleButton>
                  <TypeToggleButton
                      $isSelected={formData.qualification === 'OLD'}
                      type="button"
                      onClick={() => handleQualificationTypeSelection('OLD')}
                  >
                    NUGGET
                  </TypeToggleButton>
                  <TypeToggleButton
                      $isSelected={formData.qualification === 'WELFARE'}
                      type="button"
                      onClick={() => handleQualificationTypeSelection('WELFARE')}
                  >
                    WELFARE
                  </TypeToggleButton>
                  <TypeToggleButton
                      $isSelected={formData.qualification === 'BOY'}
                      type="button"
                      onClick={() => handleQualificationTypeSelection('BOY')}
                  >
                    BOY
                  </TypeToggleButton>
                  <TypeToggleButton
                      $isSelected={formData.qualification === 'SOLDIER'}
                      type="button"
                      onClick={() => handleQualificationTypeSelection('SOLDIER')}
                  >
                    SOLDIER
                  </TypeToggleButton>
                  <TypeToggleButton
                      $isSelected={formData.qualification === 'KID'}
                      type="button"
                      onClick={() => handleQualificationTypeSelection('KID')}
                  >
                    KID
                  </TypeToggleButton>
                  </TypeToggleContainer>
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <Label>부가서비스 그룹 검색</Label>
                <SearchContainer>
                  <SearchInput 
                    type="text" 
                    value={searchGroup}
                    onChange={(e) => setSearchGroup(e.target.value)}
                    placeholder="부가서비스 그룹 ID 입력"
                  />
                  <SearchButton type="button" size="small" onClick={handleSearch}>검색</SearchButton>
                </SearchContainer>
              </FormGroup>
              <FormGroup>
                <Label>검색 결과</Label>
                <ServicesSection>
                  {searchResults.length === 0 ? (
                    <div style={{ padding: '16px', color: '#777', textAlign: 'center' }}>검색 결과가 없습니다.</div>
                  ) : (
                    searchResults.map(group => (
                      <ServiceItem key={group.id}>
                        <ServiceName>{group.name}</ServiceName>
                        <ActionButton type="button" $variant="add" onClick={() => selectGroup(group)}>추가</ActionButton>
                      </ServiceItem>
                    ))
                  )}
                </ServicesSection>
              </FormGroup>
              <FormGroup>
                <Label>선택된 부가서비스 그룹</Label>
                <ServicesSection>
                  {selectedGroup ? (
                    <ServiceItem>
                      <ServiceName>{selectedGroup.name}</ServiceName>
                      <ActionButton type="button" $variant="remove" onClick={removeGroup}>제거</ActionButton>
                    </ServiceItem>
                  ) : (
                     <div style={{ padding: '16px', color: '#777', textAlign: 'center' }}>선택된 그룹이 없습니다.</div>
                  )}
                </ServicesSection>
              </FormGroup>
            </div>
          </FormGrid>
          
          <ButtonGroup>
            <CreateButton type="submit" primary={true} size="medium">
              {loading ? '생성 중...' : '요금제 만들기'}
            </CreateButton>
            <Button type="button" primary={false} size="medium" onClick={() => navigate('/admin/plans')}>
              취소
            </Button>
          </ButtonGroup>
        </FormContainer>
      </PageContent>
      {showModal && (
          <Modal
              message={modalMessage}
              onClose={() => {
                setShowModal(false);
                if (modalMessage.includes("성공")) {
                  navigate('/admin/plans');
                }
              }}
          />
      )}
    </PageContainer>
  );
};

export default AdminMplanCreatePage;