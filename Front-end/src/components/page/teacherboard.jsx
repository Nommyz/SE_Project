// src/components/Dashboard.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from './navbar';
import axios from 'axios';
import { useState , useEffect} from 'react';
import { Button } from '@mui/material';

export default function teacherboard(props) {
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .post(`localhost:3000/activity`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          "Cannot connect to the network. Please try again later."
        );
      });
  }, [props.instructor_id]);

  
  function createData(name,add,edit,del) {
    return {name,add,edit,del};
  }

  const rows = [
    createData('Design','Add','Show','Edit','Delete'),
  ];

  return (
    <div>
      <Navbar fullName={fullName}/>
      <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}>
        <div style={{backgroundColor : '#c07fcb'}}>
            <h1>กิจกรรม</h1>
            <TableContainer component={Paper} sx={{minWidth : '1500px' , minHeight : '1000px', alignContent : 'center' }}>
            <Table aria-label="simple table" stickyHeader >
          <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 1 }  }}
                >
                <TableCell component="th" scope="row" sx={{fontSize : '25px',display:"flex",margin:"auto"}}>
                    {row.name}
                    <div style={{border:"solid 1px" ,display:"flex-end",margin:"left"}}>
                    <Button variant='contained' sx={{margin:"auto"}}>Add</Button>
                    <Button variant='contained' sx={{margin:"auto"}}>Show</Button>
                    <Button variant='contained' sx={{margin:"auto"}}>Edit</Button>
                    <Button variant='contained' sx={{margin:"auto"}}>Delete</Button>
                    </div>
                </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </div>
  </div>
  );
}

