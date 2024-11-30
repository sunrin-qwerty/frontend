import React, { useState } from "react"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
    const [errorMessage, setErrorMessage] = useState("")
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const handleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse
        
        try {
            const response = await axios.post(
                backendUrl + "/login/google-login",
                { token: credential },
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                navigate('/')
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                alert(error.response.data.message)
            } else {
                alert('로그인에 실패했습니다.')
                setErrorMessage('로그인에 실패했습니다.')
            }
        }
    }

    const handleFailure = () => {
        setErrorMessage("로그인에 실패했습니다.")
        alert("로그인에 실패했습니다.")
    }

    return (
        <div>
            <GoogleOAuthProvider clientId={clientId}>
                <div>
                    <h2>Google 로그인</h2>
                    <GoogleLogin 
                        onSuccess={handleSuccess} 
                        onError={handleFailure} 
                    />
                </div>
            </GoogleOAuthProvider>
        </div>
    )
}

export default Login