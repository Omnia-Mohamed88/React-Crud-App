import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
            rows.map((row) => (
              <TableRow key={row.id}>
                {headers.slice(0, -1).map((header, index) => (
                  <TableCell key={index}>
  {header.toLowerCase() === 'image' ? (
    row.attachments && row.attachments.length > 0 ? (
      <img
        src={row.attachments[0].file_path}
        alt={row.title ? row.title : "Image"}
        style={{ width: 100, height: 100, objectFit: 'cover' }}
      />
    ) : (
      <span>No image</span>
    )
  ) : header.toLowerCase() === 'category image' ? (
    row.category && row.category.attachments && row.category.attachments.length > 0 ? (
      <img
        src={row.category.attachments[0].file_path}
        alt={row.category.title ? row.category.title : "Category Image"}
        style={{ width: 100, height: 100, objectFit: 'cover' }}
      />
    ) : (
      <span>No category image</span>
    )
  ) : (
    row[header.toLowerCase()] || '-'
  )}
</TableCell>

                ))}
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