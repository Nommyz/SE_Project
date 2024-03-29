// src/components/Dashboard.js
import React, { cert } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlinePrinter } from "react-icons/ai";
import "./studentboard.css";

export default function Studentboard(props) {
  const [items, setItems] = useState([]);
  const [skills, setSkill] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/activity/student?id=${props.studentId}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          "Cannot connect to the network. Please try again later."
        );
      });
    axios
      .get(`http://localhost:3000/skill/?id=${props.studentId}`)
      .then((response) => {
        setSkill(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          "Cannot connect to the network. Please try again later."
        );
      });
  }, [props.studentId]);

  const downloadCertificate = (fullname) => {
    axios.get(`http://localhost:3000/certificate/${fullname}`);

    (async () => {
      await import(
        `../../../../Back-end/CertificateGenerator/out/${fullname}.pdf`
      ).then((r) => {
        window.location.assign(require(r.default));
      });
    })();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ minWidth: "1500px", minHeight: "1000px", alignContent: "center" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#c07fcb",
                  color: "#ffff",
                  fontWeight: "bold",
                }}
              >
                ชื่อกิจกรรม
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#c07fcb",
                  color: "#ffff",
                  fontWeight: "bold",
                }}
              >
                ผู้จัดกิจกรรม
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#c07fcb",
                  color: "#ffff",
                  fontWeight: "bold",
                }}
              >
                วันที่เข้าร่วม
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#c07fcb",
                  color: "#ffff",
                  fontWeight: "bold",
                }}
              >
                ทักษะที่ได้รับ
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#c07fcb",
                  color: "#ffff",
                  fontWeight: "bold",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                hover
                key={row.instructor}
                sx={{
                  "&:last-child td, &:last-child th": { border: 2 },
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
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "2.5px solid",
                  }}
                >
                  {row.act_name}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "2.5px solid",
                  }}
                >
                  {row.instructor.toLowerCase()}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "2.5px solid",
                  }}
                >
                  {moment(row.date).utc().format("YYYY-MM-DD")}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "2.5px solid",
                  }}
                >
                  {skills
                    .filter(
                      (data) =>
                        data.act_name === row.act_name &&
                        data.instructor === row.instructor
                    )
                    .map((data) => data.skill_type)
                    .join(", ")}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "2.5px solid",
                  }}
                >
                  <button
                    className="printer-btn"
                    onClick={() => {
                      downloadCertificate(props.fullName);
                    }}
                  >
                    <AiOutlinePrinter size={25} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
