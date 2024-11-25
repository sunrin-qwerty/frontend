import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './pages/error.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    }
])

export default router