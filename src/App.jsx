import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home.jsx";
import Login from "./component/Login.jsx";
import Tarif from "./component/Tarif.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import Register from "./component/Register.jsx";

function App() {
    return (
        <>

                <Routes>
                    <Route
                        path="/login"
                        element={<Login />} />
                    <Route
                        path="/register"
                        element={<Register />} />
                    <Route
                        path="/"
                        element={<ProtectedRoute element={Home} />}
                    />
                    <Route
                        path="/tarif"
                        element={<ProtectedRoute element={Tarif} />}
                    />
                    <Route
                        path="/home"
                        element={<ProtectedRoute element={Home} />}
                    />
                </Routes>

        </>
    )
}

export default App