import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../util/axios';

interface Review {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    memberResponse: {
        name: string;
    };
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
    position: relative;
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 12px;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;

    &:hover {
        color: #FF007C;
    }
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

    const username = localStorage.getItem("username");

    const fetchReviews = async () => {
        try {
            const res = await api.get(`/v1/${mplanId}/review`);
            setReviews(res.data.data.reviewsResponse);
        } catch (err) {
            console.error('리뷰 불러오기 실패:', err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [mplanId]);

    const handleSubmit = async () => {
        if (!newReview.trim()) return;

        try {
            await api.post(`/v1/${mplanId}/review`, {
                content: newReview.trim(),
            });

            setNewReview('');
            await fetchReviews();
        } catch (err) {
            console.error('리뷰 등록 실패:', err);
        }
    };

    const handleDelete = async (reviewId: number) => {
        try {
            await api.delete(`/v1/${mplanId}/review`, {
                data: { id: reviewId },
            });
            setReviews((prev) => prev.filter((r) => r.id !== reviewId));
        } catch (err) {
            console.error('리뷰 삭제 실패:', err);
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
                            {review.memberResponse.name === username && (
                                <DeleteButton onClick={() => handleDelete(review.id)}>삭제</DeleteButton>
                            )}
                            <div style={{ marginBottom: '4px', fontWeight: 600 }}>
                                {review.memberResponse.name} {review.userId}
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
