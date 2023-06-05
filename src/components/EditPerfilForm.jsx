import React from 'react'

const EditPerfilForm = () => {
    return (
        <form className='flex flex-col gap-5'>
            <div className="flex flex-col gap-y-4 gap-x-4 md:flex-row md:gap-y-0">
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Username</label>
                    <input className="rounded-lg w-full border-gray-400" id='username' type='text' name='username' />
                </div>
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Correo</label>
                    <input className="rounded-lg w-full border-gray-400" type='email' id='email' name='email' />
                </div>
            </div>
            <div className="flex flex-col gap-y-4 gap-x-4 md:flex-row md:gap-y-0">
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Contraseña</label>
                    <input className="rounded-lg w-full border-gray-400" id='password' type='password' name='password' />
                </div>
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Avatar</label>
                    <input className="w-full border border-gray-400 rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:bg-azul-claro file:text-white file:border-0 file:mr-4 file:px-4 file:py-3" type='file' id='avatar' />
                </div>
            </div>
            {/* <button className="bg-verde-oscuro w-auto min-w-[20%] rounded-lg mx-auto py-2 px-2 text-white font-bold hover:bg-verde-claro active:bg-verde-claro" type='submit' disabled={loadingImage}>{loadingImage ? '...Cargando imagen' : 'Enviar'}</button> */}
        </form>
    )
}

export default EditPerfilForm