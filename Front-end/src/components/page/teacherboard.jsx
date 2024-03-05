// src/components/Dashboard.js
import dayjs from "dayjs";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { Button, Dialog, Icon, IconButton, Tooltip, Zoom } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import "./teacherboard.css";

export default function Teacherboard(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [info, setInfo] = useState([]);
  const [actname, setActname] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState(dayjs());
  const [preval, setPreval] = useState(false);
  const [prevactname, setPrevActname] = useState("");
  const [prevdescription, setPrevDescrip] = useState("");
  const [prevdate, setPrevDate] = useState("");

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
    axios
      .get(`http://localhost:3000/activity/?instructor=${props.fullName}`)
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          "Cannot connect to the network. Please try again later."
        );
      });
  }, [props.fullName]);

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

  const UpdateActivity = (act_name, instructor) => {
    axios
      .get(
        `http://localhost:3000/activity/single?act_name=${act_name}&instructor=${instructor}`
      )
      .then((res) => {
        setPrevActname(res.data[0].act_name);
        setPrevDate(res.data[0].date);
        setPrevDescrip(res.data[0].description);
      });
  };

  const DeleteActivity = (act_name, instructor) => {
    Swal.fire({
      title: "Are you sure you want to delete this activity?",
      icon: "warning",
      showDenyButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `http://localhost:3000/activity?act_name=${act_name}&instructor=${instructor}`
        );
        Swal.fire("Delete!", "", "success");
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire("Deletes are not saved");
      }
    });
  };

  const saveData = () => {
    if (actname.length === 0) {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Error!",
        icon: "error",
        text: "Activity name field is required!",
      });
      return;
    }

    axios.all([
      axios
        .post(`http://localhost:3000/activity`, {
          act_name: actname,
          instructor: props.fullName,
          description: description,
          date: date,
        })
        .then((res) => {
          Swal.fire({
            customClass: {
              container: "my-swal",
            },
            title: "Success!",
            icon: "success",
            text: "submitted successfully!",
          });
        })
        .catch((err) => {
          Swal.fire({
            customClass: {
              container: "my-swal",
            },
            title: "Error!",
            icon: "error",
            text: "Activity name field must be unique!",
          });
        }),
      axios.post(`http://localhost:3000/skill`, {
        act_name: actname,
        instructor: props.fullName,
        skill_type: checkedOne ? "Problem-Solving" : "",
      }),
      axios.post(`http://localhost:3000/skill`, {
        act_name: actname,
        instructor: props.fullName,
        skill_type: checkedTwo ? "Communication" : "",
      }),
      axios.post(`http://localhost:3000/skill`, {
        act_name: actname,
        instructor: props.fullName,
        skill_type: checkedThree ? "Teamwork" : "",
      }),
    ]);
  };

  const [open, toggleOpen] = useToggle(false);
  const [openSkill, toggleOpenskill] = useToggle(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ backgroundColor: "#c07fcb", marginTop: "20px" }}>
          <h2
            style={{
              color: "#ffff",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Activity
          </h2>
          <TableContainer
            component={Paper}
            sx={{
              minWidth: "1600px",
              maxHeight: "100%",
              alignContent: "center",
            }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableBody>
                {info.map((row) => (
                  <TableRow
                    key={row.act_name}
                    sx={{ "&:last-child td, &:last-child th": {} }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: "25px",
                        display: "flex",
                        margin: "auto",
                      }}
                    >
                      {row.act_name}
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          marginLeft: "auto",
                        }}
                      >
                        <Tooltip
                          title="Add People"
                          arrow
                          TransitionComponent={Zoom}
                          sx={{ backgroundColor: "#ffff" }}
                        >
                          <IconButton
                            aria-label="add"
                            sx={{ marginRight: "auto" }}
                          >
                            <PersonAddIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="View People"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <IconButton
                            aria-label="view"
                            sx={{ marginRight: "auto" }}
                          >
                            <VisibilityIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Edit Activity"
                          arrow
                          TransitionComponent={Zoom}
                          onClick={() => {
                            toggleOpen(),
                              setPreval(true),
                              UpdateActivity(row.act_name, row.instructor);
                          }}
                        >
                          <IconButton
                            aria-label="edit"
                            sx={{ marginRight: "auto" }}
                          >
                            <EditIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Delete Activity"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <IconButton
                            aria-label="delete"
                            sx={{ marginRight: "auto" }}
                            onClick={() => {
                              DeleteActivity(row.act_name, row.instructor);
                            }}
                          >
                            <DeleteIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div>
          <Button
            onClick={() => {
              toggleOpen(), setPreval(false);
            }}
            variant="contained"
            color="secondary"
            size="large"
            sx={{ position: "fixed", bottom: "50px", left: "46%" }}
          >
            <AddCircleIcon sx={{ marginRight: "5px" }} />
            Add Activity
          </Button>
          <Dialog open={open}>
            <div style={{ width: "600px", height: "500px" }}>
              <div style={{ display: "flex" }}>
                <h4 style={{ marginLeft: "240px", marginTop: "5px" }}>
                  Add Activity
                </h4>
                <IconButton
                  onClick={toggleOpen}
                  aria-label="close"
                  sx={{ marginLeft: "auto" }}
                >
                  <CancelIcon
                    sx={{ color: "red" }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  />
                </IconButton>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <h5 style={{ marginLeft: "50px" }}>ชื่อกิจกรรม</h5>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={{
                    width: "360px",
                    marginRight: "50px",
                    marginLeft: "24px",
                  }}
                  value={preval ? prevactname : actname}
                  onChange={(e) => setActname(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <h5 style={{ marginLeft: "50px" }}>วัน/เดือน/ปี</h5>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker"]}
                    sx={{ marginRight: "10px", marginLeft: "20px" }}
                  >
                    <DatePicker
                      value={preval ? dayjs(prevdate) : date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div
                style={{
                  display: "flex-box",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <h5 style={{ marginLeft: "50px" }}>รายละเอียดเพิ่มเติม</h5>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={{
                    width: "472px",
                    marginRight: "50px",
                    marginLeft: "50px",
                  }}
                  value={preval ? prevdescription : description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <h5 style={{ marginLeft: "50px" }}>สิ่งที่ได้รับ</h5>
                <button className="btn btn-success" onClick={saveData}>
                  Submit
                </button>
                <IconButton
                  aria-lable="add skill"
                  onClick={toggleOpenskill}
                  sx={{ marginLeft: "25px" }}
                >
                  <AddCircleIcon />
                </IconButton>

                <Dialog open={openSkill}>
                  <div style={{ width: "600px", height: "300px" }}>
                    <div style={{ display: "flex" }}>
                      <h4 style={{ marginLeft: "255px", marginTop: "5px" }}>
                        Add Skill
                      </h4>
                      <IconButton
                        onClick={toggleOpenskill}
                        aria-label="close"
                        sx={{ marginLeft: "auto" }}
                      >
                        <CancelIcon sx={{ color: "red" }} />
                      </IconButton>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                        marginRight: "auto",
                      }}
                    >
                      <h5 style={{ marginLeft: "50px" }}>แนะนำ</h5>
                      <div>
                        <FormControlLabel
                          sx={{ marginLeft: "20px" }}
                          control={
                            <Checkbox
                              checked={checkedOne}
                              onChange={handleChangeOne}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label="Problem-Solving"
                        />
                        <FormControlLabel
                          sx={{ marginLeft: "20px" }}
                          control={
                            <Checkbox
                              checked={checkedTwo}
                              onChange={handleChangeTwo}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label="Communication"
                        />
                        <FormControlLabel
                          sx={{ marginLeft: "20px" }}
                          control={
                            <Checkbox
                              checked={checkedThree}
                              onChange={handleChangeThree}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label="Teamwork"
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
