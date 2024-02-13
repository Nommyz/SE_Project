import React from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Studentboard from "./components/page/studentboard";
import TeacherBoard from "./components/page/teacherboard";
import Homepage from "./components/page/homepage.jsx";
import Profile from "./components/page/profile.jsx";
import Login from "./components/page/login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="login" element={<Login />} /> */}
      <Route path="studentboard" element={<Studentboard />} />
      <Route path="teacherboard" element={<TeacherBoard />} />
      <Route path="profile" element={<Profile />} />
    </>
  )
);

export default router;
