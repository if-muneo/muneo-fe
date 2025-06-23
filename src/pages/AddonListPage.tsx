import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import api from '../util/axios';
import type {DefaultAddonResponse} from "../types/AddonList.ts";
import Pagination from "../components/Pagination.tsx";

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

const AddonsWrapper = styled.div`
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

const AddonName = styled.span`
    font-size: 20px;
    font-weight: 700;
    color: #333333;
`;

const AddonDetail = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #555555;
    line-height: 1.6;
    margin-top: 8px;
`;

const AddonListPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [addons, setAddons] = useState<DefaultAddonResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get(`/v1/addon?page=${currentPage}`)
            .then(res => {
                const response = res.data.data.addonsResponse;
                setAddons(response.content);
                setTotalPages(response.totalPages);
            })
            .catch(err => {
                console.error('부가서비스 로딩 실패:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentPage]);

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
                <Title>U+ 부가서비스 전체보기</Title>

                {loading ? (
                    <div>불러오는 중...</div>
                ) : (
                    <AddonsWrapper>
                        {addons.map((addon, idx) => (
                            <OverviewCard
                                key={addon.id}
                                as={motion.div}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.05, duration: 0.3 }}
                            >
                                <SectionBox flexRatio={2}>
                                    <div>
                                        <AddonName>{addon.name}</AddonName>
                                        <AddonDetail>
                                            <div>가격: {(addon.price).toLocaleString()}원</div>
                                            <div>서비스 설명: {addon.description}</div>
                                        </AddonDetail>
                                    </div>
                                </SectionBox>
                            </OverviewCard>
                        ))}
                    </AddonsWrapper>
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

export default AddonListPage;