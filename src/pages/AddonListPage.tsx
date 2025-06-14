import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import api from '../util/axios';
import type {DefaultAddon, DefaultAddonsResponse} from "../types/AddonList.ts";

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

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 32px;
    width: 100%;
`;

const PageButton = styled.button<{ active?: boolean }>`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid ${({ active }) => (active ? '#815BFF' : '#D1D1D1')};
    background-color: ${({ active }) => (active ? '#EDE1FF' : '#FFFFFF')};
    color: ${({ active }) => (active ? '#815BFF' : '#333333')};
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const AddonListPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [addons, setAddons] = useState<DefaultAddon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get<{ defaultAddonsResponse: DefaultAddonsResponse }>(`/v1/addons?page=${currentPage}`)
            .then(res => {
                const response = res.data.defaultAddonsResponse;
                setAddons(response.const);
                setTotalPages(response.totalPages);
            })
            .catch(err => {
                console.error('부가서비스 로딩 실패:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                                    </div>
                                </SectionBox>
                            </OverviewCard>
                        ))}
                    </AddonsWrapper>
                )}

                <PaginationWrapper>
                    <PageButton
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        {'<'}
                    </PageButton>

                    {Array.from({ length: totalPages }, (_, idx) => (
                        <PageButton
                            key={idx}
                            active={currentPage === idx}
                            onClick={() => setCurrentPage(idx)}
                        >
                            {idx + 1}
                        </PageButton>
                    ))}

                    <PageButton
                        disabled={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        {'>'}
                    </PageButton>
                </PaginationWrapper>
            </ContentContainer>
        </PageContainer>
    );
};

export default AddonListPage;
