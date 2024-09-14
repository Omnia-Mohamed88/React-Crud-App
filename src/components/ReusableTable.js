import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ReusableTable = ({ headers, rows }) => (
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
                {rows.map((row, index) => (
                    <TableRow key={index}>
                        {headers.map((header) => (
                            <TableCell key={header}>{row[header.toLowerCase()] || row[header]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default ReusableTable;
