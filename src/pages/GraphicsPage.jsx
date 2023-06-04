import React from 'react'
import PieGraphic from '../components/PieGraphic'

const GraphicsPage = () => {
    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-lg shadow-lg w-full pt-8 mt-14 md:w-1/2">
                    <h2 className="text-center">Gráficos</h2>
                    {/* <div style={{ height: 400 }}> */}
                    <div className='h-72'>
                        <PieGraphic></PieGraphic>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default GraphicsPage