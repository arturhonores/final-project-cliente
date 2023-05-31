import { useContext } from "react"
import { AuthContext } from "./../contexts/auth.context"
import { Navigate, Outlet } from 'react-router-dom'
// import Loader from "../components/Loader/Loader"

const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <p>...Cargando</p>
    }

    if (!user) {
        return <Navigate to="/iniciar-sesion" />
    }

    return <Outlet />
}

export default PrivateRoute