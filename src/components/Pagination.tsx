// src/components/Pagination.tsx
import React from 'react';
import styled from 'styled-components';
import { getPageButtons } from '../util/pagination';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 32px;
    width: 100%;
`;

const Button = styled.button<{ active?: boolean }>`
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

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = getPageButtons(currentPage, totalPages);

    return (
        <Wrapper>
            <Button disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)}>
                {'<'}
            </Button>

            {pages.map((page, idx) =>
                page === 'ellipsis' ? (
                    <Ellipsis key={`ellipsis-${idx}`}>…</Ellipsis>
                ) : (
                    <Button
                        key={page}
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page + 1}
                    </Button>
                )
            )}

            <Button
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            >
                {'>'}
            </Button>
        </Wrapper>
    );
};

export default Pagination;
