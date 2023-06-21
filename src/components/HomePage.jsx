import logoHomepage from '../assets/images/image-homepage.svg'
import { motion } from 'framer-motion'

const HomePage = () => {
    return (
        <div className='max-w-7xl px-4 mx-auto flex flex-col justify-center items-center h-screen min-h-[600px] gap-x-8 md:flex-row md:min-h-[400px]'>
            <motion.section
                className='text-center space-y-4 md:w-1/2 py-4 md:text-left md:py-0'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    opacity: {
                        duration: 2,
                    },
                    x: {
                        type: 'spring',
                        stiffness: 50,
                        damping: 20
                    }
                }}
            >
                <h1 className='text-3xl font-bold text-slate-700 md:text-4xl lg:text-5xl xl:text-6xl'>Registra, ahorra y disfruta. ¡Tu dinero bajo control!</h1>
                <p className='italic text-verde-oscuro text-sm md:text-md lg:text-lg'>Disfruta de gastos sin culpa y ahorros sin esfuerzo con una amigable y flexible aplicación para gestionar tus finanzas.</p>
            </motion.section>
            <section className='w-10/12 md:w-1/2'>
                <motion.img className='max-h-[250px] md:max-h-none'
                    src={logoHomepage}
                    alt=""
                    width="100%"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        opacity: {
                            duration: 2,
                        },
                        x: {
                            type: 'spring',
                            stiffness: 50,
                            damping: 20
                        }
                    }}
                />
            </section>
        </div>
    )
}

export default HomePage