import React from "react";

import { Route,createBrowserRouter,createRoutesFromElements } from "react-router-dom";
import Login from "./components/page/Login";
import Studentboard from "./components/page/studentboard";
import TeacherBoard from "./components/page/teacherboard";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Login/>}/>
            <Route path="studentboard" element={<Studentboard/>}/>
            <Route path="teacherboard" element={<TeacherBoard/>}/>
        </>
    )
)

export default router

