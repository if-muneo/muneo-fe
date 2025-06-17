import { useState } from 'react';
import styled from 'styled-components';
import AdminListLayout from '../components/AdminUI/AdminListLayout';
import AdminListItem from '../components/AdminUI/AdminListItem';
import CreateButton from '../components/AdminUI/CreateButton';
import Pagination from '../components/AdminUI/Pagination';
import { 임시_요금제_데이터 } from '../models/AddOnModels';

const PriceTag = styled.span`
  font-size: 16px;
  color: #E60074;
  font-weight: 600;
`;

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
};

const PlanListPage = () => {
  const 페이지당_요금제개수 = 5;

  const [currentPage, setCurrentPage] = useState(1);
  
  const 전체_페이지수 = Math.ceil(임시_요금제_데이터.length / 페이지당_요금제개수);
  
  const 마지막_인덱스 = currentPage * 페이지당_요금제개수;
  const 첫_인덱스 = 마지막_인덱스 - 페이지당_요금제개수;
  const 현재_요금제_목록 = 임시_요금제_데이터.slice(첫_인덱스, 마지막_인덱스);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const pageNumbers = [];
  for (let i = 1; i <= 전체_페이지수; i++) {
    pageNumbers.push(i);
  }
  
  const 요금제_만들기_버튼 = (
    <CreateButton label="요금제 만들기" />
  );
  
  return (
    <AdminListLayout 
      title="요금제 목록" 
      createButtonComponent={요금제_만들기_버튼}
    >
      {현재_요금제_목록.map((요금제, 인덱스) => (
        <AdminListItem
          key={요금제.id}
          index={인덱스}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>{요금제.name}</span>
              <PriceTag>{formatPrice(요금제.price || 0)}</PriceTag>
            </div>
          </div>
        </AdminListItem>
      ))}
        
      <Pagination 
        currentPage={currentPage}
        totalPages={전체_페이지수}
        onPageChange={paginate}
      />
    </AdminListLayout>
  );
};

export default PlanListPage;
