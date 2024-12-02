import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./App.css"
import Header from "./pages/header"

function App() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

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

    const handleLoginClick = () => {
        navigate('/login')
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
            <Header />
            <h1>qwerty-web</h1>
        </div>
    )
}

export default App