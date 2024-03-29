import React from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Studentboard from "./components/page/studentboard";
import TeacherBoard from "./components/page/teacherboard";
import Homepage from "./components/page/homepage.jsx";
import StudentPage from "./components/page/studentpage.jsx";
import Profile from "./components/page/profile.jsx";
import TeacherPage from "./components/page/teacherpage.jsx";
import ProfilePage from "./components/page/profilepage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      <Route path="studentboard" element={<Studentboard />} />
      <Route path="teacherboard" element={<TeacherBoard />} />
      <Route path="studentpage" element={<StudentPage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="teacherpage" element={<TeacherPage />} />
      <Route path="profilepage" element={<ProfilePage />} />
    </>
  )
);

export default router;
