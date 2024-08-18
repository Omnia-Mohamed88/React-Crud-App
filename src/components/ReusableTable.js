import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ReusableTable = ({ headers, rows, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="h6">{row.title}</Typography>
                  <Typography variant="body2">ID: {row.id}</Typography>
                </TableCell>
                <TableCell>
                  {onEdit && (
                    <Button variant="contained" color="primary" onClick={() => onEdit(row.id)}>
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDelete(row.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
