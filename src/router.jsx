import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Test from './pages/test.jsx'
import Login from './pages/login.jsx'
import ErrorPage from './pages/error.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },{
        path: "/test",
        element: <Test />,
        errorElement: <ErrorPage />
    },{
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />
    }
])

export default router