import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminListLayout from '../components/AdminUI/AdminListLayout';
import AdminListItem from '../components/AdminUI/AdminListItem';
import CreateButton from '../components/AdminUI/CreateButton';
import Pagination from '../components/AdminUI/Pagination';
import api from "../util/axios.ts";

const ServiceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ServiceType = styled.span`
  font-size: 12px;
  background-color: #FFF0F7;
  color: #E60074;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
`;

type AddonType = 'MEDIA' | 'CALL' | 'SALE' | 'SAFE' | 'CONVENIENCE';

interface AddonResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  addonType: AddonType;
}

const AdditionalServiceListPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<AddonResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get(`/v1/addon?page=${currentPage}`);
        console.log(res);
        setServices(res.data.data.addonsResponse.content); // content: 실제 목록
        setTotalPages(res.data.data.addonsResponse.totalPages -1); // totalPages: 전체 페이지 수
      } catch (error) {
        console.error('부가서비스 불러오기 실패', error);
      }
    };

    fetchServices();
  }, [currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const createAddonButton = (
      <CreateButton
          label="부가서비스 만들기"
          onClick={() => navigate('/admin/services/create')}
      />
  );

  return (
      <AdminListLayout
          title="부가서비스 목록"
          createButtonComponent={createAddonButton}
      >
        {services.map((addOnService, index) => (
            <AdminListItem
                key={addOnService.id}
                index={index}
            >
              <ServiceInfo>
                <div>{addOnService.name}</div>
                <ServiceType>{addOnService.addonType}</ServiceType>
              </ServiceInfo>
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

export default AdditionalServiceListPage;
