import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from '../services/auth.services.js'
import uploadServices from "../services/upload.services.js"
import AlertErrors from "./AlertErrors.jsx"
import { AiFillAlert } from "react-icons/ai"

const SingupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
    })

    const [validValues, setValidValues] = useState({ username: '', email: '', password: '' });
    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const emailRegex = /^[^\s](([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])\S{6,}$/;
    const usernameRegex = /^(?=[a-zA-Z0-9._]{3,10}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })

        if (name === 'username' || name === 'email' || name === 'password') {
            setValidValues(prev => {
                return {
                    ...prev,
                    [name]: name === 'username' ? usernameRegex.test(value) : name === 'email' ? emailRegex.test(value) : passwordRegex.test(value)
                }
            })
        }
    }


    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
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
            .signup(signupData)
            .then(({ data }) => navigate('/iniciar-sesion'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const { username, password, email } = signupData


    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className="flex flex-col gap-y-4 gap-x-4 md:flex-row md:gap-y-0">
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Nombre</label>
                    <input className="rounded-lg w-full border-slate-400 focus:border-none focus:ring-verde-claro focus:outline-none" id='username' type='text' value={username} onChange={handleInputChange} name='username' />
                    {!validValues.username && username && <p className="text-red-500 text-xs mt-1"><AiFillAlert className="inline align-baseline" /><span>Tu nombre debe contener de 3 a 10 caracteres y no puede empezar ni terminar con puntos o guiones bajos.</span></p>}
                </div>
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Correo</label>
                    <input className="rounded-lg w-full border-slate-400 focus:border-none focus:ring-verde-claro focus:outline-none" type='email' id='email' value={email} onChange={handleInputChange} name='email' />
                    {!validValues.email && email && <p className="text-red-500 text-xs mt-1"><AiFillAlert className="inline align-baseline" /><span>Ingresa un correo electrónico válido</span></p>}
                </div>
            </div>
            <div className="flex flex-col gap-y-4 gap-x-4 md:flex-row md:gap-y-0">
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Contraseña</label>
                    <input className="rounded-lg w-full border-slate-400 focus:border-none focus:ring-verde-claro focus:outline-none" id='password' type='password' value={password} onChange={handleInputChange} name='password' />
                    {!validValues.password && password && <p className="text-red-500 text-xs mt-1"><AiFillAlert className="inline align-baseline" /><span>La contraseña debe tener al menos una mayúscula, una minúscula, un número y debe tener al menos 6 caracteres</span></p>}
                </div>
                <div className="w-3/4 md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Avatar</label>
                    <input className="pr-2 w-full border border-slate-400 rounded-lg text-sm focus:z-10 focus:border-none focus:ring-verde-claro focus:outline-verde-claro file:bg-azul-claro file:font-semibold file:text-white file:border-0 file:mr-2 file:px-4 file:py-3 cursor-pointer" type='file' id='avatar' onChange={handleFileUpload} />
                </div>
            </div>
            <div className="w-3/4 md:w-full mx-auto">
                {
                    errors.length > 0 && errors.map(elm => <AlertErrors key={elm.index} message={elm}></AlertErrors>)
                }
            </div>
            <button className="bg-verde-oscuro w-auto min-w-[7rem] rounded-full mx-auto py-2 px-5 text-white font-bold hover:bg-verde-claro active:bg-verde-claro" type='submit' disabled={loadingImage}>{loadingImage ? '...Cargando imagen' : 'Enviar'}</button>
        </form>
    )
}

export default SingupForm