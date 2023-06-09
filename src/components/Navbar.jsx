import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/auth.context'
import Dropdown from './Dropdown'
import { AiFillEuroCircle } from 'react-icons/ai'

const Navbar = () => {

    const { user, logout } = useContext(AuthContext)

    return (
        <div className='shadow-lg fixed top-0 inset-x-0 bg-white z-50 h-14'>
            <div className='max-w-7xl px-4 mx-auto'>
                <nav className='flex justify-between items-center h-14'>
                    <Link to={'/'}><h3 className='uppercase text-azul-oscuro font-bold'><AiFillEuroCircle className='inline align-middle text-2xl' /><span className='align-middle'> Cash Minder</span></h3></Link>
                    {
                        user
                            ?
                            <>
                                <Dropdown />
                            </>
                            :
                            <Link to={"/iniciar-sesion"} className='rounded-full bg-verde-claro px-5 font-bold py-1 text-white active:bg-verde-oscuro hover:bg-verde-oscuro'>LOGIN</Link>
                    }
                </nav>
            </div>
        </div>
    )
}

export default Navbar