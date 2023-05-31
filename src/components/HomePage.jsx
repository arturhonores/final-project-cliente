import logoHomepage from '../assets/images/image-homepage.svg'

const HomePage = () => {
    return (
        <div className='max-w-7xl px-4 mx-auto'>
            <div className='h-screen flex flex-col justify-center items-center gap-8 md:flex-row'>
                <section className='text-center space-y-4 md:w-1/2 md:text-left'>
                    <h1 className='text-4xl font-bold text-azul-oscuro lg:text-5xl xl:text-6xl'>Change Your Relationship With Money</h1>
                    <p className='italic text-azul-claro md:text-lg'>Enjoy guilt-free spending and effortless saving with a friendly, flexible App for managing your finances.</p>
                </section>
                <section className='w-10/12 md:w-1/2'>
                    <img src={logoHomepage} alt="" width="100%" />
                </section>
            </div>
        </div>
    )
}

export default HomePage