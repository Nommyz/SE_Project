// src/components/Dashboard.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name) {
  return {name};
}

const rows = [
  createData('Design'),
];

export default function Studentboard() {
  return (
    <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}>
        <div style={{backgroundColor : '#c07fcb'}}>
            <h2>กิจกรรม</h2>
            <TableContainer component={Paper} sx={{minWidth : '1500px' , minHeight : '1000px', alignContent : 'center' }}>
            <Table aria-label="simple table" stickyHeader >
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 1 }  }}
                >
                <TableCell component="th" scope="row" sx={{fontSize : '25px'}}>
                    {row.name}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
        </div>
    </div>
  );
}

