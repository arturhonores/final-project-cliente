import loginImage from "../assets/images/login-image.svg"
import SingupForm from "../components/SingupForm"

const SingupPage = () => {
    return (
        <div className='max-w-7xl px-4 mx-auto'>
            <div className='h-screen min-h-[700px] flex flex-col justify-center items-center gap-8 md:flex-row md:min-h-[550px]'>
                <section className='hidden md:w-1/2 md:block'>
                    <img src={loginImage} alt="" width="100%" className="md:max-h-[400px] lg:max-h-[500px]" />
                </section>
                <section className='text-center space-y-4 w-full md:w-1/2 md:text-left'>
                    <p className="text-center text-azul-oscuro font-bold text-lg uppercase">Regístrate</p>
                    <SingupForm></SingupForm>
                </section>
            </div>
        </div>
    )
}

export default SingupPage