import React from 'react'
import EditPerfilForm from '../components/EditPerfilForm'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth.context';

// TODO: NOMINAR EN INGLES
const EditPerfilPage = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="flex flex-col items-center pt-28 pb-5">
                <div className="rounded-lg shadow-lg w-full py-8 md:w-1/2">
                    <img src={user.avatar} alt="" className='w-20 aspect-square object-cover rounded-full shadow-inner mx-auto -mt-16' />
                    <h2 className="text-center text-azul-oscuro uppercase font-bold py-4">Editar Perfil</h2>
                    <EditPerfilForm />
                </div>
            </div>
        </div>
    )
}

export default EditPerfilPage