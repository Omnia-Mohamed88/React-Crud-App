import React from 'react';
import { Pagination } from '@mui/material';

const PaginationComponent = ({ meta, onPageChange }) => {
  const totalPages = meta?.total_pages || 1; 
  const currentPage = meta?.current_page || 1; 

  const handlePageChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
    />
  );
};

export default PaginationComponent;
