import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
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

    if (isLoading) return null

    const openinfo = () => {
        console.log(user.name)
        console.log(user.student_id)
    }

    const headerContent = (
        <header className="top-header">
            <div className="container">
                <div className="user-menu">
                    <a href="/">Home</a>
                    {user ? (
                        <>
                            <a href="/assignment">Assignment</a>
                            <a><button onClick={openinfo}>{user.name}</button></a>
                            <a>
                                <button onClick={handleLogout}>Logout</button>
                            </a>
                        </>
                    ) : (
                        <a href="/login">Login</a>
                    )}
                </div>
            </div>
        </header>
    )

    return headerContent
}

export default Header