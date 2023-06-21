import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../contexts/auth.context'
import uploadServices from "../services/upload.services.js"
import { useNavigate } from 'react-router-dom'
import usersService from '../services/user.services'



const EditPerfilForm = () => {

    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [userEdit, setUserEdit] = useState({
        username: user.username,
        avatar: user.avatar,
        limit: user.limit
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { username, limit } = userEdit
    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        usersService
            .userEdit(user._id)
            .then(({ data }) => {
                const updateUser = data
                setUserEdit(updateUser)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        //lógica para asegurar limit = 0
        let newValue = value;

        if (name === "limit" && (value === "" || value === null)) {
            newValue = "0";
        }
        setUserEdit({ ...userEdit, [name]: newValue })
    }

    const handleSubmit = e => {
        e.preventDefault()
        usersService
            .userEdit(user._id, userEdit)
            .then((response) => {
                setUser(userEdit)  // actualizar los datos del usuario en el contexto
                navigate("/gastos")
            })
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setUserEdit({ ...userEdit, avatar: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className="flex flex-col gap-y-4 gap-x-4">
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Username</label>
                    <input className="rounded-lg w-full border-slate-400 focus:border-none focus:ring-verde-claro focus:outline-none" id='username' autoFocus onChange={handleInputChange} value={username} type='text' name='username' />
                </div>
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Correo</label>
                    <input className="rounded-lg w-full border-slate-400 bg-slate-200 cursor-not-allowed" type='email' disabled value={user.email} id='email' name='email' />
                </div>
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Límite de gasto mensual</label>
                    <div className='group relative'>
                        <input className="rounded-lg w-full border-slate-400 focus:border-none focus:ring-verde-claro focus:outline-none" type='number' min='0' onChange={handleInputChange} value={limit} id='limit' name='limit' />
                        <p className="rounded-lg px-4 text-center text-white text-xs font-semibold hidden group-hover:flex group-hover:items-center group-hover:absolute group-hover:justify-center group-hover:h-11 group-hover:-top-11 group-hover:right-0 group-hover:left-0 group-hover:bg-verde-oscuro transition duration-300">Opcionalmente puedes asignar un límite de gasto mensual</p>
                    </div>
                </div>
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Avatar</label>
                    <input className="pr-2 w-full border border-slate-400 rounded-lg text-sm focus:z-10 focus:border-none focus:ring-verde-claro focus:outline-verde-claro file:bg-azul-claro file:font-semibold file:text-white file:border-0 file:mr-2 file:px-4 file:py-3 cursor-pointer" type='file' id='avatar' onChange={handleFileUpload} />
                </div>
            </div>
            <button className="bg-verde-oscuro w-auto min-w-[20%] rounded-full mx-auto py-2 px-2 text-white font-bold hover:bg-verde-claro active:bg-verde-claro" type='submit' disabled={loadingImage}>{loadingImage ? '...Cargando imagen' : 'Enviar'}</button>
        </form>
    )
}

export default EditPerfilForm