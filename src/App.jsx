import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./App.css"
import Header from "./pages/header"

function App() {
    return (
        <>
            <header className="top-header">
                <Header />
            </header>
            <div>
                <img src="./logo.svg" alt="QWERTY" style={{ width: "200px", margin: "50px" }}/>
                <h1>QWERTY<br /></h1>
                <h2>SUNRIN<br />WEB DEVELOPMENT CLUB</h2>
            </div>
        </>
    )
}

export default App