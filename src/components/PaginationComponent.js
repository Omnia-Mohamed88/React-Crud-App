import React from "react";
import { Box, Pagination } from "@mui/material";

const PaginationComponent = ({ meta, onPageChange }) => {
  const totalPages = meta?.last_page || 1;
  const currentPage = meta?.current_page || 1;

  const handlePageChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={"32px"}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );
};

export default PaginationComponent;
