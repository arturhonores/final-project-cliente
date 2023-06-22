import { useState, useContext } from "react"
import authService from "../services/auth.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"
import AlertErrors from "./AlertErrors.jsx"
import { AiFillAlert, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Loader from "./Loader"

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [validValues, setValidValues] = useState({ email: null, password: null });
    const [errors, setErrors] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const emailRegex = /^[^\s](([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])\S{6,}$/;

    const { authenticateUser, storeToken } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })

        if (name === 'email' || name === 'password') {
            setValidValues(prev => {
                return {
                    ...prev,
                    [name]: name === 'email' ? emailRegex.test(value) : passwordRegex.test(value)
                }
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setIsLoading(true)
        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/gastos')
                setIsLoading(false)
            })
            .catch(err => {
                setErrors(err.response.data.message)
                console.log(err.response.data.message)
            })
    }

    const { password, email } = loginData


    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className="flex flex-col gap-y-4 gap-x-4">
                <div className="w-full md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Correo</label>
                    <input className="rounded-lg w-full border-slate-400 focus:border-none focus:ring-verde-claro focus:outline-none" id='email' type='email' value={email} onChange={handleInputChange} name='email' />
                    {!validValues.email && email && <p className="text-red-500 text-xs mt-1"><AiFillAlert className="inline align-baseline" /><span>Ingresa un correo electrónico válido</span></p>}
                </div>
                <div className="w-full md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Contraseña</label>
                    <div className="relative">
                        <input className="rounded-lg w-full border-slate-400 focus:border-none focus:ring-verde-claro focus:outline-none" type={showPassword ? 'text' : 'password'} id='password' value={password} onChange={handleInputChange} name='password' />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiOutlineEyeInvisible className="text-lg" /> : <AiOutlineEye className="text-lg" />}
                        </button>
                    </div>
                    {!validValues.password && password && <p className="text-red-500 text-xs mt-1"><AiFillAlert className="inline align-baseline" /><span>La contraseña debe tener al menos una mayúscula, una minúscula, un número y debe tener al menos 6 caracteres</span></p>}
                </div>
                <div className="w-3/4 md:w-full mx-auto">
                    {
                        errors.length > 0 && <AlertErrors message={errors}></AlertErrors>
                    }
                </div>
            </div>
            {
                isLoading
                    ? <div className="mx-auto"><Loader></Loader></div>
                    : <button className="bg-verde-oscuro w-auto min-w-[7rem] rounded-full mx-auto py-2 px-5 text-white hover:bg-verde-claro font-bold" type='submit'>Enviar</button>

            }
        </form>
    )
}

export default LoginForm