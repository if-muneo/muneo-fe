import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';

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
`;

const AddonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const OverviewCard = styled.div`
    display: flex;
    height: 100px;
    align-items: center;
    background-color: #F5F5F5;
    border-radius: 12px;
    padding: 14px 24px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
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

const Ellipsis = styled.span`
    font-size: 16px;
    color: #666666;
`;

const overviewData = [
    {
        name: 'V컬러링 바이브 플러스'
    },
    {
        name: '유튜브 프리미엄'
    },
    {
        name: '지니 뮤직'
    },
    {
        name: '디즈니+ 팩',
    },
];

const AddonListPage: React.FC = () => {
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

                <AddonsWrapper>
                    {overviewData.map((addon, idx) => (
                        <OverviewCard
                            key={idx}
                            as={motion.div}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                        >
                            <SectionBox flexRatio={2}>
                                <div>
                                    <AddonName>{addon.name}</AddonName>
                                </div>
                            </SectionBox>
                        </OverviewCard>
                    ))}
                </AddonsWrapper>

                <PaginationWrapper>
                    <PageButton>{'<'}</PageButton>
                    <PageButton active>1</PageButton>
                    <PageButton>2</PageButton>
                    <PageButton>3</PageButton>
                    <Ellipsis>…</Ellipsis>
                    <PageButton>99</PageButton>
                    <PageButton>{'>'}</PageButton>
                </PaginationWrapper>
            </ContentContainer>
        </PageContainer>
    );
};

export default AddonListPage;
