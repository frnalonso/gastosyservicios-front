import React, { useEffect, useState } from 'react'
import { getServiciosResumen } from '../services/servicioServices'
import { Link } from 'react-router-dom'

const ServicioList = () => {

    const [servicio, setServicio] = useState([])

    useEffect(() => {
        loadServicio();
    }, [])


    //llenamos los datos de los servicios
    const loadServicio = async() => {
        try {
            const data = await getServiciosResumen();
            console.log(data);
            setServicio(data)
        } catch (error) {
            console.error("Error al cargar servicios:", error);
        }
    }

    const formatDate = (dateString) => { 
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' }; 
        return new Date(dateString).toLocaleDateString(undefined, options); 
    }


    return (

        <>

            <h2 className='text-2xl font-bold mb-6'>Listado Servicios</h2>

            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Servicio</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Monto a Pagar</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Próximo Vencimiento</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Pagos</th>
                        </tr>

                    </thead>
                    {
                        <tbody className="bg-white">
                            {servicio.map(servicio => (
                                <tr key={servicio.id}>
                                    <td className="py-4 px-6 border-b border-gray-200">{servicio.nombre}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">${Number(servicio.monto).toFixed(2)}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{formatDate(servicio.fecha_vencimiento)}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <Link to={`/servicios/pagos/${servicio.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Ver Pagos
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
    
                    }
                    <tfoot>
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Total</th>
                            <td className="py-4 px-6 border-b border-gray-200">$
                                {servicio
                                    .reduce((total, servicio) => total + Number(servicio.monto), 0)
                                    .toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        </>
    )
}

export default ServicioList
