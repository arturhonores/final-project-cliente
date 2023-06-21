import { Link } from "react-router-dom"
import loginImage from "../assets/images/login-image.svg"
import LoginForm from "../components/LoginForm"

const LoginPage = () => {
    return (
        <div className='max-w-7xl px-4 mx-auto'>
            <div className='h-screen min-h-[600px] bg-red flex flex-col justify-center items-center gap-8 md:flex-row'>
                <section className='hidden md:w-1/2 md:block'>
                    <img src={loginImage} alt="" width="100%" className="md:max-h-[400px] lg:max-h-[500px]" />
                </section>
                <section className='text-center space-y-4 w-3/4 md:w-1/2 md:text-left '>
                    <h2 className="text-center font-bold uppercase text-azul-oscuro">Iniciar Sesión</h2>
                    <p className="text-center">¿No tienes cuenta?<span className="text-azul-claro underline underline-offset-1 pl-3 hover:text-verde-oscuro"><Link to={"/registro"}>Crear Cuenta</Link></span></p>
                    <LoginForm></LoginForm>
                </section>
            </div>
        </div>
    )
}

export default LoginPage