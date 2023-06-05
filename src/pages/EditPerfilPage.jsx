import React from 'react'
import EditPerfilForm from '../components/EditPerfilForm'

const EditPerfilPage = () => {
    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-lg shadow-lg w-full pt-8 mt-14 md:w-1/2">
                    <h2 className="text-center text-azul-oscuro uppercase font-bold">Editar Perfil</h2>
                    <EditPerfilForm />
                </div>
            </div>
        </div>
    )
}

export default EditPerfilPage