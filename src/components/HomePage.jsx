import logoHomepage from '../assets/images/image-homepage.svg'

const HomePage = () => {
    return (
        <div className='max-w-7xl px-4 mx-auto'>
            <div className='h-screen flex flex-col justify-center items-center gap-8 md:flex-row'>
                <section className='text-center space-y-4 md:w-1/2 md:text-left'>
                    <h1 className='text-4xl font-bold text-slate-700 lg:text-5xl xl:text-6xl'>Registra, ahorra y disfruta. ¡Tu dinero bajo control!</h1>
                    <p className='italic text-azul-oscuro md:text-lg'>Disfruta de gastos sin culpa y ahorros sin esfuerzo con una amigable y flexible aplicación para gestionar tus finanzas.</p>
                </section>
                <section className='w-10/12 md:w-1/2'>
                    <img src={logoHomepage} alt="" width="100%" />
                </section>
            </div>
        </div>
    )
}

export default HomePage