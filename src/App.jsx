import React, { useState, useEffect } from "react"
import Login from "./pages/login"
import axios from "axios"
import Cookies from "js-cookie"
import "./App.css"

function App() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(backendUrl + "/check-auth", { 
                    withCredentials: true 
                })
                setUser(response.data)
                console.log("User authenticated:", response.data)
            } catch (error) {
                console.error("Auth check failed:", error)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const handleLoginSuccess = (userData) => {
        console.log("Login success:", userData)
        setUser(userData.user)
    }

    const handleLogout = async () => {
        try {
            await axios.post(backendUrl + "/logout", {}, { withCredentials: true })
            setUser(null)
            alert("로그아웃되었습니다.")
        } catch (error) {
            console.error("Logout error:", error)
            alert("로그아웃에 실패했습니다.")
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    )
}

export default App