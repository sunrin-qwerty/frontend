import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./style/assignment.css"
import Header from "./header"

function Assignment() {
    const [assignments, setAssignments] = useState([])
    const [error, setError] = useState(null)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/assignments`, { withCredentials: true })
                setAssignments(data)
            } catch (error) {
                console.error("Error fetching assignments:", error)
                setError(error.response?.data?.error || "Failed to fetch assignments")
            }
        }

        fetchAssignments()
    }, [backendUrl])

    const viewSubmissions = (assignmentId) => {
        navigate(`/assignments/${assignmentId}/submissions`)
    }

    return (
        <div className="assignment-container">
            <Header />
            {error && <div className="error-message">{error}</div>}
            <h1>Assignments</h1>
            <table className="assignment-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>생성일</th>
                        <th>마감 기한</th>
                        <th>제출 여부</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <tr key={assignment.id}>
                            <td>{assignment.id}</td>
                            <td>{assignment.title}</td>
                            <td>{new Date(assignment.created_at).toISOString().split('T')[0]}</td>
                            <td>{new Date(assignment.deadline).toISOString().split('T')[0]}</td>
                            <td>{assignment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Assignment