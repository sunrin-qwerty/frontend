import React, { useState, useEffect } from "react"
import Login from "./pages/login"
import {jwtDecode} from "jwt-decode"
import Cookies from "js-cookie"
import "./App.css"

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = Cookies.get("authToken")
        if (token) {
            const decodedToken = jwtDecode(token)
            setUser({
                name: decodedToken.name,
                email: decodedToken.email,
                picture: decodedToken.picture,
            })
        }
    }, [])

    const handleLoginSuccess = (token) => {
        const decodedToken = jwtDecode(token)
        console.log("Decoded Token:", decodedToken)

        setUser({
            name: decodedToken.name,
            email: decodedToken.email,
            picture: decodedToken.picture,
        })

        Cookies.set("authToken", token, { path: "/", secure: true, sameSite: "strict" })
    }

    const handleLogout = () => {
        setUser(null)
        Cookies.remove("authToken", { path: "/" })
    }

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <img
                        src={user.picture}
                        alt="Profile"
                        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                    />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    )
}

export default App