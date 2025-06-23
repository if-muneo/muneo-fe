import React, { useEffect, useState }from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import api from '../util/axios';
import type {Mplan} from "../types/MplanList.ts";
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    background-color: #FFFFFF;
`;

const ContentContainer = styled(motion.div)`
    max-width: 1280px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 0 24px 40px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #111111;
    margin-bottom: 24px;
    max-width: 960px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
`;

const PlansWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const OverviewCard = styled.div`
    display: flex;
    align-items: flex-start;
    background-color: #F5F5F5;
    border-radius: 12px;
    padding: 14px 24px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 960px;
`;

const SectionBox = styled.div<{ flexRatio?: number }>`
    flex: ${({ flexRatio }) => flexRatio || 1};
    display: flex;
    align-items: flex-start;
`;


const Divider = styled.div`
    width: 1px;                 
    height: 50px;               
    background-color: #D1D1D1;  
    margin: 0 24px;             
`;

const PlanName = styled.span`
    font-size: 20px;
    font-weight: 700;
    color: #333333;
`;

const PlanDetail = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #555555;
    line-height: 1.6;
    margin-top: 8px;
`;

const AddonLabel = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #666666;
`;

const AddonItems = styled.div`
    margin-top: 8px;
    font-size: 14px;
    color: #777777;
`;

const MplanListPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [mplans, setMplans] = useState<Mplan[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api.get(`/v1/mplan?page=${currentPage}`)
            .then((res) => {
                const response = res.data.data.mplansResponse;
                console.log('response = ', response);
                setMplans(response.content);
                setTotalPages(response.totalPages);
            })
            .catch((err) => {
                console.error('요금제 데이터 로딩 실패:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentPage]); // currentPage가 바뀔 때마다 실행

    return (
        <PageContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <ContentContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <Title>U+ 요금제 전체보기</Title>

                {loading ? (
                    <div>불러오는 중...</div>
                ) : (
                    <PlansWrapper>
                        {mplans.map((mplan, idx) => (
                            <OverviewCard
                                key={idx}
                                as={motion.div}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                                onClick={() => navigate(`/mplan/${mplan.id}`, { state: mplan })}
                                style={{ cursor: 'pointer' }}
                            >
                                <SectionBox flexRatio={2}>
                                    <div>
                                        <PlanName>{mplan.name}</PlanName>
                                        <PlanDetail>
                                            <div>월정액: {mplan.monthlyPrice.toLocaleString()}원</div>
                                            <div>
                                                기본 데이터량:{' '}
                                                {mplan.basicDataAmount > 10000
                                                    ? '무제한'
                                                    : `${(mplan.basicDataAmount / 1000).toLocaleString()}GB`}
                                            </div>
                                        </PlanDetail>
                                    </div>
                                </SectionBox>

                                <Divider />
                                <SectionBox flexRatio={1}>
                                    <div>
                                        <AddonLabel>부가서비스</AddonLabel>
                                        <AddonItems>
                                            {mplan.addonGroupResponse === null ? (
                                                <span>없음</span>
                                            ) : (
                                                <div>
                                                    <strong>{mplan.addonGroupResponse?.addonGroupName}</strong>
                                                    {/*<div style={{ marginTop: '8px' }}>*/}
                                                    {/*    {mplan.addonGroupResponse?.addonGroupAddonsResponse?.addonGroupAddonsResponse*/}
                                                    {/*        ?.map((addon: Addon) => addon.name)*/}
                                                    {/*        .join(', ') ?? '부가서비스 없음'}*/}
                                                    {/*</div>*/}
                                                </div>
                                            )}
                                        </AddonItems>
                                    </div>
                                </SectionBox>

                            </OverviewCard>
                        ))}
                    </PlansWrapper>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

            </ContentContainer>
        </PageContainer>
    );
};

export default MplanListPage;
