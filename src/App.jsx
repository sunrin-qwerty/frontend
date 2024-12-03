import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./App.css"
import Header from "./pages/header"

function App() {
    return (
        <div>
            <Header />
            <h1>qwerty-web</h1>
        </div>
    )
}

export default App