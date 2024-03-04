// src/components/Dashboard.js
import dayjs from 'dayjs';

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
import { Button,Dialog,Icon,IconButton,Tooltip, Zoom } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import TextField from '@mui/material/TextField';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



export default function teacherboard(props) {
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {                                     //แก้ไขสำหรับรับ api 
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

  
  function createData(name,add,edit,del) {              //ลบได้ ใช้แค่ทดสอบ
    return {name,add,edit,del};
  }

  const rows = [                                        //ลบได้ ใช้แค่ทดสอบ
    createData('Design','Add','Show','Edit','Delete'),  
    createData('Game','Add','Show','Edit','Delete'),
    createData('star','Add','Show','Edit','Delete'),
  ];

  const [checkedOne, setCheckedone] = React.useState(true);
  const [checkedTwo, setCheckedtwo] = React.useState(true);
  const [checkedThree, setCheckedthree] = React.useState(true);

  const handleChangeOne = (event) => {
    setCheckedone(event.target.checked);
  };

  const handleChangeTwo = (event) => {
    setCheckedtwo(event.target.checked);
  };

  const handleChangeThree = (event) => {
    setCheckedthree(event.target.checked);
  };

  const useToggle = (initialState = false) => {
    const [state, setState] = React.useState(initialState);
  
    const toggle = () => {
      setState(!state);
    };
  
    return [state, toggle];
  };

  const [open, toggleOpen] = useToggle(false);
  const [openSkill, toggleOpenskill] = useToggle(false);
  const [date, setDate] = React.useState(dayjs());


  return (
    <div>
      <Navbar fullName={fullName}/>
      <div style={{display : 'flex' ,flexDirection:"column", justifyContent : 'center' , alignItems : 'center'}}>
        <div style={{backgroundColor : '#c07fcb' , marginTop:"20px"}}>
            <h2 style={{color:"#ffff" , height:"60px" , display:"flex" , justifyContent:"center" , alignItems : "center"}}>Activity</h2>
            <TableContainer component={Paper} sx={{minWidth : '1600px' , maxHeight : '100%', alignContent : 'center' }}>
            <Table aria-label="simple table" stickyHeader >
          <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { }  }}
                >
                <TableCell component="th" scope="row" sx={{fontSize : '25px',display:"flex",margin:"auto"}}>
                    {row.name}
                    <div style={{width : "50%",display:"flex",marginLeft:"auto"}}>
                    <Tooltip title="Add People" arrow TransitionComponent={Zoom} sx={{backgroundColor:"#ffff"}}>
                      <IconButton aria-label='add' sx={{marginRight:"auto"}}><PersonAddIcon color='secondary'/></IconButton>
                    </Tooltip>
                    <Tooltip title="View People" arrow TransitionComponent={Zoom}>
                      <IconButton aria-label='view' sx={{marginRight:"auto"}}><VisibilityIcon color='secondary'/></IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Activity" arrow TransitionComponent={Zoom}> 
                      <IconButton aria-label='edit' sx={{marginRight:"auto"}}><EditIcon color='secondary'/></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Activity" arrow TransitionComponent={Zoom}>
                      <IconButton aria-label='delete' sx={{marginRight:"auto"}}><DeleteIcon color='secondary'/></IconButton>
                    </Tooltip>
                    </div>
                </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
      <div >
      <Button onClick={toggleOpen} variant='contained' color='secondary' size='large' sx={{position:"fixed",bottom:"50px",left:"46%"}}><AddCircleIcon sx={{marginRight:"5px"}}/>Add Activity</Button>
      <Dialog open={open}>
        <div style={{width:"600px" , height:"500px"}}>
          <div style={{display:"flex"}}>
            <h4 style={{marginLeft:"240px" , marginTop:"5px"}}>Add Activity</h4>
            <IconButton onClick={toggleOpen} aria-label='close' sx={{marginLeft:"auto"}} ><CancelIcon sx={{color:"red"}}/></IconButton>
          </div>
          <div style={{display:"flex", alignItems:"center" , marginTop:"10px"}}>
            <h5 style={{marginLeft : "50px"}}>ชื่อกิจกรรม</h5>
            <TextField id="outlined-basic" variant="outlined" sx={{width:"360px" ,marginRight:"50px" , marginLeft:"24px"}} />
          </div>
          <div style={{display:"flex", alignItems:"center" , marginTop:"10px"}}>
            <h5 style={{marginLeft : "50px"}}>วัน/เดือน/ปี</h5>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']} sx={{marginRight:"10px" , marginLeft:"20px"}}>
                <DatePicker

                  value={date}
                  onChange={(newDate) => setValue(newDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div style={{display:"flex-box", alignItems:"center" , marginTop:"10px"}}>
            <h5 style={{marginLeft : "50px"}}>รายละเอียดเพิ่มเติม</h5>
            <TextField id="outlined-basic" variant="outlined" sx={{width:"472px" ,marginRight:"50px" , marginLeft:"50px"}} />
          </div>
          <div style={{display:"flex", alignItems:"center" , marginTop:"10px"}}>
            <h5 style={{marginLeft : "50px"}}>สิ่งที่ได้รับ</h5>
            <IconButton aria-lable='add skill' onClick={toggleOpenskill} sx={{marginLeft:"25px"}}><AddCircleIcon/></IconButton>
            <Dialog open={openSkill}>
              <div style={{width:"600px" ,height:"300px"}}>
                <div style={{display:"flex"}}>
                  <h4 style={{marginLeft:"255px" , marginTop:"5px"}}>Add Skill</h4>
                  <IconButton onClick={toggleOpenskill} aria-label='close' sx={{marginLeft:"auto"}} ><CancelIcon sx={{color:"red"}}/></IconButton>
                </div>
                <div style={{display:"flex", alignItems:"center" , marginTop:"10px" ,marginRight : "auto"}}>
                  <h5 style={{marginLeft : "50px"}}>แนะนำ</h5>
                  <div>
                  <FormControlLabel sx={{marginLeft:"20px"}}
                    control={
                      <Checkbox  
                        checked={checkedOne}
                        onChange={handleChangeOne}
                        inputProps={{ 'aria-label': 'controlled' }}/>
                      }
                    label="Coding"
                  />
                  <FormControlLabel sx={{marginLeft:"20px"}}
                    control={
                      <Checkbox  
                        checked={checkedTwo}
                        onChange={handleChangeTwo}
                        inputProps={{ 'aria-label': 'controlled' }}/>
                      }
                    label="Mathing"
                  />
                  <FormControlLabel sx={{marginLeft:"20px"}}
                    control={
                      <Checkbox  
                        checked={checkedThree}
                        onChange={handleChangeThree}
                        inputProps={{ 'aria-label': 'controlled' }}/>
                      }
                    label="Drawing"
                  />
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </Dialog>
      </div>
    </div>
  </div>
  );
}

