import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import api from '../util/axios';

const PageContainer = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
`;

const ContentContainer = styled(motion.div)`
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    /* Header 높이 제외한 공간에서 시작 지점에서 약간 아래로 위치 */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 80px 24px 40px;
`;

// InfoCard: 고정 너비 설정
const InfoCard = styled.div`
    width: 1000px;
    max-width: 100%;
    border: 1px solid #FF007C;
    border-radius: 16px;
    padding: 60px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
`;

// 필드 텍스트 크기 조정
const Field = styled.div`
    margin-bottom: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #333;
    font-size: 22px;
    letter-spacing: 0.5px;
    span.label {
        font-weight: 600;
        margin-right: 16px; /* 레이블과 값 사이 여백 증가 */
        font-size: 22px;
    }
`;

interface UserInfo {
    name: string;
    plan: string;
    phone: string;
    signUpDate: string;
    services: string[];
    dataRemaining: string;
}

const MyPage: React.FC = () => {
    // const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    // ✅ 사용자 정보 요청
    useEffect(() => {
        api.get('/v1/users/me') // ← 백엔드 API 주소에 맞게 수정
            .then((res) => {
                // setUser(res.data);
            })
            .catch((err) => {
                console.error('사용자 정보 불러오기 실패:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const user = {
        name: 'test',
        plan: 'test',
        phone: 'test',
        signUpDate: 'test',
        services: ['test', 'test', 'test', 'test'],
        dataRemaining: 'test',
    };

    return (
        <PageContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* 상단 고정 헤더 */}
            <Header />

            {/* 사용자 정보 섹션: 위/아래, 좌/우 모두 가운데 정렬 */}
            <ContentContainer
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {/* MY PAGE 제목 */}
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '24px',
                    color: '#FF007C',
                }}>MY PAGE</h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <InfoCard>
                        <Field><span className="label">이름:</span>{user.name}</Field>
                        <Field><span className="label">가입된 요금제:</span>{user.plan}</Field>
                        <Field><span className="label">핸드폰 번호:</span>{user.phone}</Field>
                        <Field><span className="label">가입 날짜:</span>{user.signUpDate}</Field>
                        <Field>
                            <span className="label">사용 중인 부가서비스:</span>
                            {user.services.join(', ')}
                        </Field>
                        <Field><span className="label">남은 데이터량:</span>{user.dataRemaining}GB</Field>
                    </InfoCard>
                </motion.div>
            </ContentContainer>
        </PageContainer>
    );
};

export default MyPage;
