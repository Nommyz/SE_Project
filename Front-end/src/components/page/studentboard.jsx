// src/components/Dashboard.js
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "นายขนมต้ม",
    "ดาวน์โหลด",
    "อาจารย์",
    "24/01/2567",
    "Reading/Coding"
  ),
];

export default function Studentboard() {
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
              <TableCell sx={{ backgroundColor: "#c07fcb", color: "#ffff" }}>
                ชื่อกิจกรรม
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#c07fcb", color: "#ffff" }}
              >
                เกียรติบัตร
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#c07fcb", color: "#ffff" }}
              >
                ผู้จัดกิจกรรม
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#c07fcb", color: "#ffff" }}
              >
                วันที่เข้าร่วม
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#c07fcb", color: "#ffff" }}
              >
                สิ่งที่ได้รับ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
