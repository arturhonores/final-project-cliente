import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { useNavigate } from 'react-router-dom';
import { BiLogOut, BiEdit } from 'react-icons/bi'
import { GiPayMoney } from 'react-icons/gi'
import { VscGraph } from 'react-icons/vsc'
import ModalUserEdit from './ModalUserEdit';

const Dropdown = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" onClick={() => setOpen(!open)} className="flex justify-center items-center w-full rounded-md border-none px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-0">
                    <img src={user.avatar} className='w-10 aspect-square object-cover rounded-full shadow-inner' alt="" />
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm0 14a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 17z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <ModalUserEdit showModal={showModal} setShowModal={setShowModal} />
            <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-verde-claro ring-1 ring-black ring-opacity-5 ${open ? 'block' : 'hidden'}`}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div
                        className="py-2 px-4 block"
                    >
                        <p className='text-center text-white font-semibold uppercase'>¡Hola,<span>{user.username}</span>!</p>
                    </div>
                    <div
                        className="py-2 px-4 block cursor-pointer hover:bg-verde-oscuro"
                        onClick={() => { setOpen(false); setShowModal(true) }}
                    >
                        <p className='flex items-center gap-x-2 text-white font-semibold uppercase'><span><BiEdit /></span> <span>Editar perfil</span></p>
                    </div>
                    <div
                        className="py-2 px-4 block cursor-pointer hover:bg-verde-oscuro"
                        onClick={() => { setOpen(false); navigate("/gastos") }}
                    >
                        <p className='flex items-center gap-x-2 text-white font-semibold uppercase'><span><GiPayMoney /></span> <span>Gastos</span></p>
                    </div>
                    <div
                        className="py-2 px-4 block cursor-pointer hover:bg-verde-oscuro"
                        onClick={() => { setOpen(false); navigate("/graficos") }}
                    >
                        <p className='flex items-center gap-x-2 text-white font-semibold uppercase'><span><VscGraph /></span> <span>Gráficos</span></p>
                    </div>
                    <div
                        className="py-2 px-4 block cursor-pointer hover:bg-verde-oscuro"
                        onClick={() => { setOpen(false); logout() }}
                    >
                        <p className='flex items-center gap-x-2 text-white font-semibold uppercase'><span><BiLogOut /></span> <span>Cerrar Sesión</span></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dropdown