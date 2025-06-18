import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminListLayout from '../components/AdminUI/AdminListLayout';
import AdminListItem from '../components/AdminUI/AdminListItem';
import CreateButton from '../components/AdminUI/CreateButton';
import Pagination from '../components/AdminUI/Pagination';
import api from "../util/axios.ts";

const ServiceId = styled.span`
  font-size: 14px;
  color: #999;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 12px;
`;

type AddonType = 'MEDIA' | 'CALL' | 'SALE' | 'SAFE' | 'CONVENIENCE';

export interface AddonCreateRequest {
  id?: number; // Optional, 새로 생성 시에는 ID 불필요
  name: string;
  description: string;
  price: number;
  addonType: AddonType;
}

interface AddonGroupCreateRequest {
  id: number;
  addonGroupName: string;
  addonsCreateRequest: AddonCreateRequest[]; // 그룹에 포함할 부가서비스 목록
}

export interface AddonCreateRequest {
  id?: number; // Optional, 새로 생성 시에는 ID 불필요
  name: string;
  description: string;
  price: number;
  addonType: AddonType;
}


const AdminAddOnGroupPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<AddonGroupCreateRequest[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get(`/v1/addon-group?page=${currentPage}`);
        console.log(res);
        setGroups(res.data.data.addonGroupsResponse.content); // content: 실제 목록
        setTotalPages(res.data.data.addonGroupsResponse.totalPages -1); // totalPages: 전체 페이지 수
      } catch (error) {
        console.error('부가서비스 불러오기 실패', error);
      }
    };

    fetchGroups();
  }, [currentPage]);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  const createAddonGroupButton = (
    <CreateButton 
      label="부가서비스 그룹 만들기" 
      onClick={() => navigate('/admin/groups/create')}
    />
  );
  
  return (
    <AdminListLayout 
      title="부가서비스 그룹 목록" 
      createButtonComponent={createAddonGroupButton}
    >
      {groups.map((group, index) => (
        <AdminListItem
          key={group.id}
          index={index}
        >
          <div>{group.addonGroupName}</div>
          <ServiceId>그룹 ID: {group.id}</ServiceId>
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

export default AdminAddOnGroupPage;
