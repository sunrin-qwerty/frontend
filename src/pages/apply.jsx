import React, { useState, useEffect } from "react"
import axios from "axios"
import "./style/apply.css"
import Header from "./header"

function Apply() {
    const [applications, setApplications] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        email: "",
        cover_letter: "",
        portfolio: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

    useEffect(() => {
        const fetchApplications = async () => {
            console.log(`Fetching from: ${backendUrl}/apply`)
            try {
                const response = await axios.get(`${backendUrl}/apply`, {
                    withCredentials: true,
                })
                setApplications(response.data)
            } catch (err) {
                console.error("Error fetching applications:", err)
                setError("Failed to load applications.")
            }
        }

        fetchApplications()
    }, [backendUrl])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            console.log("Submitting application to:", `${backendUrl}/apply`)
            const response = await axios.post(`${backendUrl}/apply`, formData, {
                withCredentials: true,
            })
            if (response.status === 201) {
                setSuccess("지원서가 제출 되었습니다.")
                setFormData({
                    name: "",
                    phone_number: "",
                    email: "",
                    cover_letter: "",
                    portfolio: "",
                })
                setApplications((prev) => [...prev, response.data])
            }
        } catch (err) {
            console.error("Error submitting application:", err)
            setError(err.response?.data?.error || "An error occurred while submitting.")
        }
    }

    return (
        <div>
            <header className="top-header">
                <Header />
            </header>
            <h1>지원하기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone_number">전화번호</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email(학교)</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cover_letter">자기소개서</label>
                    <textarea
                        id="cover_letter"
                        name="cover_letter"
                        value={formData.cover_letter}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="portfolio">Portfolio URL</label>
                    <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                    />
                </div>
                <button id="apply-button" type="submit">제출하기</button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    )
}

export default Apply
