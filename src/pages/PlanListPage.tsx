import {useEffect, useState} from 'react';
import styled from 'styled-components';
import AdminListLayout from '../components/AdminUI/AdminListLayout';
import AdminListItem from '../components/AdminUI/AdminListItem';
import CreateButton from '../components/AdminUI/CreateButton';
import Pagination from '../components/AdminUI/Pagination';
import api from "../util/axios.ts";

const PriceTag = styled.span`
  font-size: 16px;
  color: #E60074;
  font-weight: 600;
`;

interface Addon {
  id: number;
  name: string;
  description: string;
  price: number;
  addonType: string;
}

interface AddonGroup {
  addonGroupName: string;
  addonGroupAddonsResponse: {
    addonGroupAddonsResponse : Addon[];
  };
}

interface Mplan {
  id: number;
  name: string;
  basicDataAmount: number;
  dailyData: number;
  sharingData: number;
  monthlyPrice: number;
  voiceCallVolume: number;
  textMessage: boolean;
  subDataSpeed: number;
  qualification: string;
  mplanType: string;
  dataType: string;
  addonGroupResponse: AddonGroup | null;
}


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
};


const PlanListPage = () => {
  const [mPlans, setMPlans] = useState<Mplan[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get(`/v1/mplan?page=${currentPage}`);
        console.log(res);
        setMPlans(res.data.data.mplansResponse.content); // content: 실제 목록
        setTotalPages(res.data.data.mplansResponse.totalPages -1); // totalPages: 전체 페이지 수
      } catch (error) {
        console.error('요금제 불러오기 실패', error);
      }
    };

    fetchServices();
  }, [currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const createaMPlanButton = (
    <CreateButton label="요금제 만들기" />
  );
  
  return (
    <AdminListLayout 
      title="요금제 목록" 
      createButtonComponent={createaMPlanButton}
    >
      {mPlans.map((mPlan, index) => (
        <AdminListItem
          key={mPlan.id}
          index={index}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>{mPlan.name}</span>
              <PriceTag>{formatPrice(mPlan.monthlyPrice || 0)}</PriceTag>
            </div>
          </div>
        </AdminListItem>
      ))}
        
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </AdminListLayout>
  );
};

export default PlanListPage;
