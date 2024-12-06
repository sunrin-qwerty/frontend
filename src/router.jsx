import { createBrowserRouter } from 'react-router-dom'
import App from './APP.JSX'
import Login from './pages/login.jsx'
import Assignment from './pages/assignment.jsx'
import ErrorPage from './pages/error.jsx'
import Apply from './pages/apply.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },{
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />
    },{
        path: "/assignment",
        element: <Assignment />,
        errorElement: <ErrorPage />
    },
    {
        path: "/apply",
        element: <Apply />,
        errorElement: <ErrorPage />
    }
])

export default router