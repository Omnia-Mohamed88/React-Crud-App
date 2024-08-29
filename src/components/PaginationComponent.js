import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';

const PaginationComponent = ({ meta, onPageChange }) => {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Pagination
      count={meta.total_pages || 1}  
      page={meta.current_page || 1}  
      onChange={handlePageChange}
      renderItem={(item) => (
        <PaginationItem {...item} />
      )}
    />
  );
};

export default PaginationComponent;
