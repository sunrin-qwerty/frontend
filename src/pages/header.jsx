import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./style/header.css"

function Header() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get(backendUrl + "/check-auth", { withCredentials: true })
                setUser(data)
                console.log("User authenticated:", data)
            } catch (error) {
                console.error("Auth check failed:", error)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

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

    // Early return if still loading
    if (isLoading) return <div className="loading-spinner">Loading...</div> 

    const openInfo = () => {
        console.log(user.name)
        console.log(user.student_id)
        // You could also navigate to a user profile page or open a modal here
    }

    return (
        <div className="container">
            <div className="user-menu">
                <a href="/">Home</a>
                <a href="/apply">지원하기</a>
                {user ? (
                    <>
                        <a href="/assignment">과제</a>
                        <a onClick={openInfo}>{user.name}</a>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <button onClick={() => navigate("/login")}>Login</button>
                )}
            </div>
        </div>
    )
}

export default Header