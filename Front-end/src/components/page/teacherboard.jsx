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
import "./profile.css";

export default function Teacherboard(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentfullName, setStudentfullName] = useState("");
  const [info, setInfo] = useState([]);
  const [actname, setActname] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState(dayjs());
  const [preval, setPreval] = useState(false);
  const [prevactname, setPrevActname] = useState("");
  const [prevdescription, setPrevDescrip] = useState("");
  const [prevdate, setPrevDate] = useState("");
  const [act_val, setActVal] = useState("");
  const [instructor_val, setInstrucVal] = useState("");
  const [act_n, setAct_n] = useState("");
  const [student_list, setStudent_List] = useState([]);
  const [event_std, setEventStd] = useState("");

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

  const onChangeDecrip = (e) => {
    if (preval === true) {
      setPrevDescrip(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const onChangeActname = (e) => {
    if (preval === true) {
      setPrevActname(e.target.value);
    } else {
      setActname(e.target.value);
    }
  };

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
      title: "Are you sure you want to delete this event?",
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

  const StudentList = () => {
    axios
      .get(
        `http://localhost:3000/student/all?act_name=${event_std}&instructor=${props.fullName}`
      )
      .then((response) => {
        setStudent_List(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          "Cannot connect to the network. Please try again later."
        );
      });
  };

  const SubmitStudent = () => {
    let isnum = /^\d+$/.test(studentId);

    if (isnum === false) {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Error!",
        icon: "error",
        text: "Student ID field must be number!",
      });
      return;
    } else if (studentId.length === 0) {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Error!",
        icon: "error",
        text: "Student ID field is required!",
      });

      return;
    }

    axios
      .post("http://localhost:3000/student", {
        act_name: act_n,
        instructor: props.fullName,
        std_fullname: studentfullName.toUpperCase(),
        std_id: studentId,
      })
      .then((res) => {
        Swal.fire({
          customClass: {
            container: "my-swal",
          },
          title: "Success!",
          icon: "success",
          text: "Add student successfully!",
        });
      })
      .catch((err) => {
        Swal.fire({
          customClass: {
            container: "my-swal",
          },
          title: "Error!",
          icon: "error",
          text: "Student ID is already added!",
        });
      });
  };

  const saveData = () => {
    if (actname.length === 0 && preval === false) {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Error!",
        icon: "error",
        text: "Event name field is required!",
      });
      return;
    }

    if (preval === true) {
      if (prevactname.length === 0) {
        Swal.fire({
          customClass: {
            container: "my-swal",
          },
          title: "Error!",
          icon: "error",
          text: "Event name field is required!",
        });
        return;
      }
      axios
        .patch(
          `http://localhost:3000/activity/update?act_name=${act_val}&instructor=${instructor_val}`,
          {
            act_name: prevactname,
            instructor: props.fullName,
            description: prevdescription,
            date: date,
          }
        )
        .then((res) => {
          Swal.fire({
            customClass: {
              container: "my-swal",
            },
            title: "Success!",
            icon: "success",
            text: "submitted successfully!",
          });
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
            text: "Event name is already used!",
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
  const [openView, toggleOpenView] = useToggle(false);
  const [openAddpeople, toggleOpenAddpeople] = useToggle(false);
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
                        marginLeft: "35px",
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
                            onClick={() => {
                              toggleOpenAddpeople();
                              setAct_n(row.act_name);
                            }}
                          >
                            <PersonAddIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                        <Dialog open={openAddpeople}>
                          <div style={{ width: "600px", height: "500px" }}>
                            <div style={{ display: "flex" }}>
                              <h4
                                style={{
                                  marginLeft: "255px",
                                  marginTop: "10px",
                                }}
                              >
                                Add People
                              </h4>
                              <IconButton
                                onClick={toggleOpenAddpeople}
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
                              }}
                            >
                              <h5 style={{ marginLeft: "50px" }}>Student ID</h5>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: "360px",
                                  marginRight: "50px",
                                  marginLeft: "20px",
                                }}
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "20px",
                              }}
                            >
                              <h5 style={{ marginLeft: "65px" }}>
                                Student Name
                              </h5>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: "360px",
                                  marginRight: "50px",
                                  marginLeft: "47px",
                                }}
                                value={studentfullName}
                                onChange={(e) =>
                                  setStudentfullName(e.target.value)
                                }
                              />
                            </div>

                            <button
                              style={{
                                marginLeft: "42%",
                                marginTop: "120px",
                                height: "55px",
                                width: "100px",
                              }}
                              className="btn btn-success"
                              onClick={SubmitStudent}
                            >
                              Submit
                            </button>
                          </div>
                        </Dialog>
                        <Tooltip
                          title="View People"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <IconButton
                            aria-label="view"
                            sx={{ marginRight: "auto" }}
                            onClick={() => {
                              //เปิดเพิ่มชื่อนักศึกษาเรียบร้อย รอแก้ไข
                              setEventStd(row.act_name);
                              StudentList();
                              toggleOpenView();
                            }}
                          >
                            <VisibilityIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                        <Dialog open={openView}>
                          {" "}
                          {/* //เพิ่มการมองรายชื่อ รอแก้ไข เพิ่มเติม */}
                          <div style={{ width: "600px", height: "500px" }}>
                            <div style={{ display: "flex" }}>
                              <h4
                                style={{
                                  marginLeft: "255px",
                                  marginTop: "10px",
                                }}
                              >
                                View People
                              </h4>
                              <IconButton
                                onClick={toggleOpenView}
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
                            <div>
                              <div
                                style={{
                                  marginLeft: "50px",
                                  marginRight: "50px",
                                  marginTop: "20px",

                                  height: "30px",
                                  borderRadius: "10px",
                                }}
                              >
                                <TableBody>
                                  {student_list.map((row) => (
                                    <TableRow
                                      hover
                                      key={row.std_id}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 2,
                                        },
                                        minWidth: "1500px",
                                        minHeight: "1000px",
                                        alignContent: "center",
                                      }}
                                    >
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                        style={{
                                          fontWeight: "bold",
                                          border: "none",
                                        }}
                                      >
                                        {row.std_fullname.toLowerCase()}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{
                                          fontWeight: "bold",
                                          border: "none",
                                        }}
                                      >
                                        {row.std_id}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </div>
                            </div>
                          </div>
                        </Dialog>
                        <Tooltip
                          title="Edit Activity"
                          arrow
                          TransitionComponent={Zoom}
                          onClick={() => {
                            toggleOpen(), setPreval(true);
                            UpdateActivity(row.act_name, row.instructor);
                            setActVal(row.act_name);
                            setInstrucVal(row.instructor);
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
            Add Event
          </Button>
          <Dialog open={open}>
            <div style={{ width: "600px", height: "500px" }}>
              <div style={{ display: "flex" }}>
                <h4 style={{ marginLeft: "240px", marginTop: "5px" }}>
                  Add Event
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
                <h5 style={{ marginLeft: "50px" }}>Event Name</h5>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={{
                    width: "360px",
                    marginRight: "50px",
                    marginLeft: "24px",
                  }}
                  value={preval ? prevactname : actname}
                  onChange={onChangeActname}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <h5 style={{ marginLeft: "50px" }}>Event Date</h5>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker"]}
                    sx={{ marginRight: "10px", marginLeft: "35px" }}
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
                <h5 style={{ marginLeft: "50px" }}>Description for event</h5>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={{
                    width: "472px",
                    marginRight: "50px",
                    marginLeft: "50px",
                  }}
                  value={preval ? prevdescription : description}
                  onChange={onChangeDecrip}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "10px",
                  height: "120px",
                }}
              >
                <h5 style={{ marginLeft: "50px" }}>Experience of event</h5>
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
                      <h5 style={{ marginLeft: "50px" }}>Recommended</h5>
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
              <div>
                <button
                  style={{ marginLeft: "42%" }}
                  className="btn btn-success"
                  onClick={saveData}
                >
                  Submit
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
