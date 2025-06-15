// src/utils/pagination.ts
export const getPageButtons = (
    currentPage: number,
    totalPages: number
): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    if (currentPage > 2) {
        pages.push(0); // 1번
        pages.push('ellipsis');
    } else {
        for (let i = 0; i <= Math.min(2, totalPages - 1); i++) {
            pages.push(i);
        }
    }

    const start = Math.max(3, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);

    for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
            pages.push(i);
        }
    }

    if (currentPage < totalPages - 3) {
        pages.push('ellipsis');
    }

    if (!pages.includes(totalPages - 1)) {
        pages.push(totalPages - 1);
    }

    return pages;
};