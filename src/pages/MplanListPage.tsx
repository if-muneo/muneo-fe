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
    max-width: 960px;     // ✅ 카드와 너비 일치
    width: 100%;
    margin-left: auto;    // ✅ 가운데 정렬
    margin-right: auto;
`;

const PlansWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;   // ✅ 자식 요소들 가운데 정렬
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
    max-width: 960px;   // ✅ 카드 최대 너비 제한
`;

const SectionBox = styled.div<{ flexRatio?: number }>`
    flex: ${({ flexRatio }) => flexRatio || 1};
    display: flex;
    align-items: flex-start;
`;


const Divider = styled.div`
    width: 1px;                  // 세로선이기 때문에 너비는 1px
    height: 50px;                // 원하는 높이 설정
    background-color: #D1D1D1;   // 연한 회색 (이미지처럼)
    margin: 0 24px;              // 좌우 간격
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
        name: '5G 프리미어 에센셜',
        detail: {
            monthlyPrice: '10,000원',
            tethering: '10GB',
            sharing: '10GB',
        },
        addon: {
            name: ['넷플릭스', '지니뮤직']
        }
    },
    {
        name: '5G 스탠다드',
        detail: {
            monthlyPrice: '10,000원',
            tethering: '10GB',
            sharing: '10GB',
        },
        addon: {
            name: ['넷플릭스', '지니뮤직']
        }
    },
    {
        name: '5G 심플',
        detail: {
            monthlyPrice: '10,000원',
            tethering: '10GB',
            sharing: '10GB',
        },
        addon: {
            name: ['넷플릭스', '지니뮤직']
        }
    },
    {
        name: '5G 프리미어 래귤러',
        detail: {
            monthlyPrice: '10,000원',
            tethering: '10GB',
            sharing: '10GB',
        },
        addon: {
            name: ['넷플릭스', '지니뮤직']
        }
    },
];

const MplanListPage: React.FC = () => {
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
                <PlansWrapper>
                    {overviewData.map((plan, idx) => (
                        <OverviewCard
                            key={idx}
                            as={motion.div}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                        >
                            <SectionBox flexRatio={2}>
                                <div>
                                    <PlanName>{plan.name}</PlanName>
                                    <PlanDetail>
                                        <div>월정액: {plan.detail.monthlyPrice}</div>
                                        <div>테더링: {plan.detail.tethering}</div>
                                        <div>쉐어링: {plan.detail.sharing}</div>
                                    </PlanDetail>
                                </div>
                            </SectionBox>

                            <Divider />

                            <SectionBox flexRatio={1}>
                                <div>
                                    <AddonLabel>부가서비스</AddonLabel>
                                    <AddonItems>{plan.addon.name.join(', ')}</AddonItems>
                                </div>
                            </SectionBox>
                        </OverviewCard>
                    ))}
                </PlansWrapper>

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

export default MplanListPage;
