import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/auth.context'
import uploadServices from "../services/upload.services.js"
// import authService from '../services/auth.services'

const ModalUserEdit = ({ showModal, setShowModal }) => {
    const { user, setUser } = useContext(AuthContext)

    const [loadingImage, setLoadingImage] = useState(false)

    const [updatedUserData, setUpdatedUserData] = useState({
        username: user.username,
        email: user.email,
        password: "",
        avatar: "",
    })

    useEffect(() => {
        setUpdatedUserData({
            username: user.username,
            email: user.email,
            password: "",
            avatar: user.avatar
        })
    }, [user])

    const handleInputChange = e => {
        const { value, name } = e.target
        setUpdatedUserData({ ...updatedUserData, [name]: value })
    }

    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setUpdatedUserData({ ...updatedUserData, avatar: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    const handleSubmit = e => {
        e.preventDefault()
        authService
            .updateUser(updatedUserData)
            .then(({ data }) => {
                setUser(data)
                setShowModal(false)
            })
            .catch(err => console.log(err))
    }

    // const { username, password, email } = updatedUserData

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={() => setShowModal(false)}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm min-w-[20rem]" onClick={e => e.stopPropagation()}>
                            {/*content*/}
                            <form className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" onSubmit={handleSubmit}>
                                {/*header*/}
                                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3>
                                        <img className='w-1/2 mx-auto aspect-square object-cover rounded-full shadow-inner' src={user.avatar} alt="" />
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div>
                                        <label className="block text-left text-gray-500 text-sm font-bold mb-2">Username</label>
                                        <input className="rounded-lg w-full border-gray-400" autoFocus id='username' type='text' value={updatedUserData.username} onChange={handleInputChange} name='username' />
                                    </div>
                                    <div>
                                        <label className="block text-left text-gray-500 text-sm font-bold mb-2">Correo</label>
                                        <input className="rounded-lg w-full border-gray-400" disabled type='email' id='email' value={updatedUserData.email} onChange={handleInputChange} name='email' />
                                    </div>
                                    <div>
                                        <label className="block text-left text-gray-500 text-sm font-bold mb-2">Contraseña</label>
                                        <input className="rounded-lg w-full border-gray-400" id='password' type='password' value={updatedUserData.password} onChange={handleInputChange} name='password' />
                                    </div>
                                    <div>
                                        <label className="block text-left text-gray-500 text-sm font-bold mb-2">Avatar</label>
                                        <input className="w-full border border-gray-400 rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:bg-azul-claro file:text-white file:border-0 file:mr-4 file:px-4 file:py-3" type='file' id='avatar' onChange={handleFileUpload} />
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-red-400 text-white active:bg-red-600 hover:bg-red-600 font-bold uppercase text-xs px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit" disabled={loadingImage}>{loadingImage ? '...Cargando imagen' : 'Actualizar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default ModalUserEdit