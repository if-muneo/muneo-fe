// src/components/ReviewBox.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../util/axios';

interface Review {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
}

interface ReviewBoxProps {
    mplanId: number;
}

const ReviewSection = styled.div`
    margin-top: 40px;
    width: 100%;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
`;

const ReviewTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #444;
    margin-bottom: 12px;
`;

const ReviewList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-bottom: 16px;
`;

const ReviewItem = styled.li`
    background-color: #FAFAFA;
    border: 1px solid #EEE;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
`;

const ReviewInput = styled.textarea`
    width: 100%;
    height: 80px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #DDD;
    border-radius: 8px;
    resize: none;
    margin-bottom: 12px;
`;

const SubmitButton = styled.button`
    padding: 8px 16px;
    background-color: #FF007C;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #e6006b;
    }
`;

const ReviewBox: React.FC<ReviewBoxProps> = ({ mplanId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState('');

    // 리뷰 목록 조회
    useEffect(() => {
        api.get(`/v1/reviews/${mplanId}`)
            .then((res) => setReviews(res.data))
            .catch((err) => console.error('리뷰 불러오기 실패:', err));
    }, [mplanId]);

    // 리뷰 등록
    const handleSubmit = async () => {
        if (!newReview.trim()) return;

        try {
            await api.post('/v1/reviews', {
                mplanId,
                content: newReview.trim(),
            });

            setNewReview('');
            // 등록 후 목록 다시 불러오기
            const res = await api.get(`/v1/reviews/${mplanId}`);
            setReviews(res.data);
        } catch (err) {
            console.error('리뷰 등록 실패:', err);
        }
    };

    return (
        <ReviewSection>
            <ReviewTitle>이 요금제에 대한 리뷰</ReviewTitle>

            <ReviewList>
                {reviews.length === 0 ? (
                    <div style={{ fontSize: '14px', color: '#888' }}>아직 작성된 리뷰가 없습니다.</div>
                ) : (
                    reviews.map((review) => (
                        <ReviewItem key={review.id}>
                            <div style={{ marginBottom: '4px', fontWeight: 600 }}>
                                사용자 #{review.userId}
                            </div>
                            <div>{review.content}</div>
                            <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                                {new Date(review.createdAt).toLocaleString()}
                            </div>
                        </ReviewItem>
                    ))
                )}
            </ReviewList>

            <ReviewInput
                placeholder="이 요금제에 대한 리뷰를 작성해보세요."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
            />

            <SubmitButton onClick={handleSubmit}>리뷰 등록</SubmitButton>
        </ReviewSection>
    );
};

export default ReviewBox;
