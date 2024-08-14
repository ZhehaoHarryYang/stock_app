import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const Pagination = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  const handlePageClick = (newPage) => {
    if (newPage !== page && newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key={1}
          onClick={() => handlePageClick(1)}
          disabled={page === 1}
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="dots1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={i === page}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="dots2">...</span>);
      }
      pageNumbers.push(
        <Button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          disabled={page === totalPages}
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
      <ButtonGroup>
        <Button onClick={() => handlePageClick(1)} disabled={page === 1}>First</Button>
        <Button onClick={() => handlePageClick(page - 1)} disabled={page <= 1}>Previous</Button>
        {renderPageNumbers()}
        <Button onClick={() => handlePageClick(page + 1)} disabled={page >= totalPages}>Next</Button>
        <Button onClick={() => handlePageClick(totalPages)} disabled={page === totalPages}>Last</Button>
      </ButtonGroup>
    </div>
  );
};

export default Pagination;
