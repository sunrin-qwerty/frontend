import React, { useState } from "react"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import axios from "axios"

function Login({ onLoginSuccess }) {
    const [errorMessage, setErrorMessage] = useState("")
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    const handleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse
        
        try {
            const response = await axios.post(
                "http://localhost:3000/login/google-login",
                { token: credential },
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                onLoginSuccess(response.data)
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setErrorMessage(error.response.data.message || '학교 계정으로 로그인해주세요.')
            } else {
                setErrorMessage('로그인에 실패했습니다.')
            }
        }
    }

    const handleFailure = () => {
        setErrorMessage("로그인에 실패했습니다.")
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