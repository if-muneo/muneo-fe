import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const PaginationButton = styled.button<{ $isActive?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  margin: 0 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.$isActive ? 'linear-gradient(135deg, #FF007C 0%, #E60074 100%)' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#333'};
  font-weight: ${props => props.$isActive ? '700' : '500'};
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(230, 0, 116, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Ellipsis = styled.span`
  margin: 0 8px;
  font-size: 18px;
  color: #aaa;
  display: flex;
  align-items: center;
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pagesToRender: (number | 'ellipsis')[] = [];

    const pageGroupSize = 5;
    const currentGroup = Math.floor(currentPage / pageGroupSize);
    const startPage = currentGroup * pageGroupSize;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages-1);

    // 현재 그룹 페이지 추가
    for (let i = startPage; i <= endPage; i++) {
        pagesToRender.push(i);
    }

    // 마지막 페이지가 현재 그룹에 포함되어 있지 않다면 '...'과 함께 추가
    if (endPage < totalPages) {
        pagesToRender.push('ellipsis');
        pagesToRender.push(totalPages);
    }

    return (
        <PaginationContainer>
            <PaginationButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                &lt;
            </PaginationButton>

            {pagesToRender.map((page, idx) =>
                page === 'ellipsis' ? (
                    <Ellipsis key={`ellipsis-${idx}`}>…</Ellipsis>
                ) : (
                    <PaginationButton
                        key={page}
                        $isActive={page === currentPage}
                        onClick={() => onPageChange(Number(page))}
                    >
                        {page + 1}
                    </PaginationButton>
                )
            )}

            <PaginationButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </PaginationButton>
        </PaginationContainer>
    );
};

export default Pagination;
