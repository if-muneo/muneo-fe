import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { Mplan } from '../types/MplanList';
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
    max-width: 960px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
`;

const OverviewCard = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #F5F5F5;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
`;

const PlanDetail = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #555555;
    line-height: 1.6;
    margin-top: 12px;
`;

const BackButton = styled.button`
    margin-top: 24px;
    padding: 10px 16px;
    border: none;
    background-color: #FF007C;
    color: white;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #e6006b;
    }
`;

const imageMap: { [key: string]: string } = {
    '넷플릭스': '/images/netflix.png',
    '지니뮤직': '/images/genie.png',
    '밀리의 서재': '/images/millie.png',
    '아이들 나라': '/images/kids.png',
    '바이브 앱': '/images/vibe.png',
    '유플레이': '/images/uplay.png',
    '디즈니 뿌라스': '/images/disney.png',
    '티빙': '/images/tving.png',
    '삼성팩': '/images/samsung.png',
    '애플팩': '/images/apple.png',
    '유튜브 프리미엄': '/images/youtube.png',
    '헬로렌탈': '/images/hello.png',
    '일리커피': '/images/illy.png',
    'u+ 모바일 tv': '/images/utv.png',
    '우리집 지키미 easy2': '/images/easy2.png',
    '우리집돌봄이 kids': '/images/kids_guard.png',
    '신한카드 AIR': '/images/shinhan.png',
    '군인할인': '/images/military.png',
};


const UserMplanDetailPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const mplan = location.state as Mplan | undefined;

    console.log('mplan = ', mplan); // ok

    if (!mplan) {
        return (
            <PageContainer>
                <ContentContainer>
                    <Title>잘못된 접근입니다.</Title>
                    <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
                </ContentContainer>
            </PageContainer>
        );
    }
    const addonList = mplan.addonGroupResponse?.addonGroupAddonsResponse.addonGroupAddonsResponse;
    console.log('addonList = ', addonList); // ok

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
                <Title>{mplan.name} 요금제 상세</Title>

                <OverviewCard
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <PlanDetail>
                        <div>월정액: {mplan.monthlyPrice?.toLocaleString() ?? 0}원</div>
                        <div>기본 데이터량: {(mplan.basicDataAmount ? mplan.basicDataAmount / 1000 : 0).toLocaleString()}GB</div>
                        <div>쉐어링: {(mplan.sharingData ? mplan.sharingData / 1000 : 0).toLocaleString()}GB</div>
                        <div>문자: {mplan.textMessage ? '무제한' : '기본제공'}</div>
                        <div>전화: {mplan.voiceCallVolume?.toLocaleString() ?? 0}</div>
                        <div>초과 데이터 속도: {mplan.subDataSpeed?.toLocaleString() ?? 0}Mbps</div>
                    </PlanDetail>

                    {addonList && Array.isArray(addonList) && addonList.length > 0 ? (
                        <div style={{ marginTop: '24px', width: '100%' }}>
                            <h3
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: '#666666',
                                    marginBottom: '8px',
                                }}
                            >
                                부가서비스: {mplan.addonGroupResponse?.addonGroupName ?? '없음'}
                            </h3>

                            <ul
                                style={{
                                    paddingLeft: '20px',
                                    color: '#777777',
                                    fontSize: '14px',
                                    lineHeight: '1.8',
                                }}
                            >
                                {addonList.map((addon) => (
                                    <li key={addon.id}>
                                        {addon.name} - {addon.price.toLocaleString()}원
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div style={{ marginTop: '24px', fontSize: '14px', color: '#999999' }}>
                            부가서비스 없음
                        </div>
                    )}

                    <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
                </OverviewCard>
            </ContentContainer>
        </PageContainer>
    );
};

export default UserMplanDetailPage;
