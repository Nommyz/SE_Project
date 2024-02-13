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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
<<<<<<< HEAD
      {/* <Route path="login" element={<Login />} /> */}
=======
>>>>>>> parent of b2c23408 (update ui)
      <Route path="studentboard" element={<Studentboard />} />
      <Route path="teacherboard" element={<TeacherBoard />} />
      <Route path="profile" element={<Profile />} />
    </>
  )
);

export default router;
