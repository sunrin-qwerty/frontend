import React from "react"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import Cookies from "js-cookie"

function Login({ onLoginSuccess }) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    const handleSuccess = (credentialResponse) => {
        const { credential } = credentialResponse
        console.log("Google Credential JWT:", credential)

        // JWT를 쿠키에 저장
        Cookies.set("authToken", credential, { path: "/", secure: true, sameSite: "strict" })

        // 부모 컴포넌트로 JWT 전달
        onLoginSuccess(credential)
    }

    const handleFailure = () => {
        console.error("Google Login Failed")
        alert("로그인에 실패했습니다.")
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div>
                <h2>Google 로그인</h2>
                <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
            </div>
        </GoogleOAuthProvider>
    )
}

export default Login