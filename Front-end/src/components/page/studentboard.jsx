// src/components/Dashboard.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


export default function Studentboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("localhost:3000/activity/instructor?name=thanatip", {
        params: {
          token: Cookies.get("cmu-oauth-token"),
        },
      })
      .then((response) => {
        if (response.data.ok) {
          setItems(response.data);
        }
      })
      .catch((error) => {
        if (!error.response) {
          setErrorMessage(
            "Cannot connect to the network. Please try again later."
          );
        } else if (error.response.status === 401) {
          setErrorMessage("Authentication failed");
        } else if (error.response.data.ok === false) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Unknown error occurred. Please try again later");
        }
      });
  }, []);

  return (
    <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}>
      <TableContainer component={Paper} sx={{minWidth : '1500px' , minHeight : '1000px', alignContent : 'center' }}>
      <Table aria-label="simple table" stickyHeader >
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{backgroundColor : '#c07fcb' , color : '#ffff'}}>ชื่อกิจกรรม</TableCell>
            <TableCell align='center' sx={{backgroundColor : '#c07fcb' , color : '#ffff'}}>เกียรติบัตร</TableCell>
            <TableCell align='center' sx={{backgroundColor : '#c07fcb' , color : '#ffff'}}>ผู้จัดกิจกรรม</TableCell>
            <TableCell align='center' sx={{backgroundColor : '#c07fcb' , color : '#ffff'}}>วันที่เข้าร่วม</TableCell>
            <TableCell align='center' sx={{backgroundColor : '#c07fcb' , color : '#ffff'}}>สิ่งที่ได้รับ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.act_name}
              sx={{ '&:last-child td, &:last-child th': { border: 2 },minWidth : '1500px' , minHeight : '1000px', alignContent : 'center'  }}
            >
              <TableCell component="th" scope="row">
                {row.act_name}
              </TableCell>
              <TableCell align='center'>{row.download}</TableCell>
              <TableCell align='center'>{row.instructor}</TableCell>
              <TableCell align='center'>{row.day}</TableCell>
              <TableCell align='center'>{row.skill}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

