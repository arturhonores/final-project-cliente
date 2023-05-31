import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/auth.context'

const Navbar = () => {

    const { user, logout } = useContext(AuthContext)

    return (
        <div className='shadow-lg fixed top-0 inset-x-0'>
            <div className='max-w-7xl px-4 mx-auto'>
                <nav className='flex justify-between items-center h-14'>
                    <Link to={'/'}><h3 className='uppercase text-azul-oscuro font-bold'>Money Minder</h3></Link>
                    {
                        user && <Link to={"/perfil"}>{user.username}</Link>
                    }
                    <Link onClick={logout}>Cerrar Sesión</Link>
                    <Link to={"/iniciar-sesion"} className='rounded-full bg-verde-claro px-5 py-1 text-white hover:bg-verde-oscuro'>LOGIN</Link>
                </nav>
            </div>
        </div>
    )
}

export default Navbar