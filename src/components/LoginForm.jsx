import { useState, useContext } from "react"
import authService from "../services/auth.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { authenticateUser, storeToken } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/gastos')
            })
            .catch(err => console.log(err))
    }

    const { password, email } = loginData


    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className="flex flex-col gap-y-4 gap-x-4">
                <div className="w-full md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Email</label>
                    <input className="rounded-lg w-full border-gray-400" id='email' type='email' value={email} onChange={handleInputChange} name='email' />
                </div>
                <div className="w-full md:w-1/2 mx-auto">
                    <label className="block text-left text-gray-500 text-sm font-bold mb-2">Contraseña</label>
                    <input className="rounded-lg w-full border-gray-400" type='password' id='password' value={password} onChange={handleInputChange} name='password' />
                </div>
            </div>
            <button className="bg-verde-oscuro w-1/5 rounded-lg mx-auto py-2 text-white hover:bg-verde-claro" type='submit'>Enviar</button>
        </form>
    )
}

export default LoginForm