import { useEffect, useState } from "react"
import Header from "./header"
import "./style/assignment.css"

function Assignment() {
    const [assignments, setAssignments] = useState([])

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/assignments", { credentials: "include" })
            .then(response => response.json())
            .then(data => setAssignments(data))
            .catch(error => console.error("Error fetching assignments:", error))
    }, [])

    return (
        <>
            <Header />
            <div id="assignment-list">
                <table>
                    <thead>
                        <tr>
                            <th>과제번호</th>
                            <th>과제명</th>
                            <th>제출기한</th>
                            <th>제출여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment) => (
                            <tr key={assignment.id}>
                                <td>{assignment.id}</td>
                                <td>{assignment.name}</td>
                                <td>{assignment.deadline}</td>
                                <td>{assignment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Assignment