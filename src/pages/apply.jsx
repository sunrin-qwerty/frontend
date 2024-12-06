import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/apply.css";

function Apply() {
    const [applications, setApplications] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        email: "",
        cover_letter: "",
        portfolio: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Backend URL 설정
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    // 지원서 목록 가져오기
    useEffect(() => {
        const fetchApplications = async () => {
            console.log(`Fetching from: ${backendUrl}/apply`);
            try {
                const response = await axios.get(`${backendUrl}/apply`, {
                    withCredentials: true,
                });
                setApplications(response.data);
            } catch (err) {
                console.error("Error fetching applications:", err);
                setError("Failed to load applications.");
            }
        };

        fetchApplications();
    }, [backendUrl]);

    // 폼 데이터 변경 처리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 지원서 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            console.log("Submitting application to:", `${backendUrl}/apply`);
            const response = await axios.post(`${backendUrl}/apply`, formData, {
                withCredentials: true,
            });
            if (response.status === 201) {
                setSuccess("Application submitted successfully!");
                setFormData({
                    name: "",
                    phone_number: "",
                    email: "",
                    cover_letter: "",
                    portfolio: "",
                });
                setApplications((prev) => [...prev, response.data]);
            }
        } catch (err) {
            console.error("Error submitting application:", err);
            setError(err.response?.data?.error || "An error occurred while submitting.");
        }
    };

    return (
        <div>
            <h1>Apply</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
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
                    <label htmlFor="phone_number">Phone Number:</label>
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
                    <label htmlFor="email">Email:</label>
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
                    <label htmlFor="cover_letter">Cover Letter:</label>
                    <textarea
                        id="cover_letter"
                        name="cover_letter"
                        value={formData.cover_letter}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="portfolio">Portfolio URL:</label>
                    <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Submit Application</button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <h2>Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app.id}>
                        <p>Name: {app.name}</p>
                        <p>Email: {app.email}</p>
                        <p>Phone: {app.phone_number}</p>
                        <p>Cover Letter: {app.cover_letter}</p>
                        <p>Portfolio: {app.portfolio}</p>
                        <p>Applied At: {new Date(app.applied_at).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Apply;