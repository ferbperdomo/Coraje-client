import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate, Outlet } from 'react-router-dom'


function PrivateRoute() {

    const { isLoggedIn, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <h1>Cargando...</h1>
    }

    if (!isLoggedIn) {
        return <Navigate to="/inicio-sesion" />
    }

    return <Outlet />
}

export default PrivateRoute

