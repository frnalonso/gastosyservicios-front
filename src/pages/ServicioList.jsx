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
    };

    const formatDate = (dateString) => { 
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' }; 
        return new Date(dateString).toLocaleDateString(undefined, options); 
    };

    const getEstadoServicio = (servicio) => {
        const hoy = new Date();
        const vencimiento = new Date(servicio.fecha_vencimiento);

        if (servicio.pagado) {
            return {label: "Al día", color: "green"};
        }

        const diasRestantes = Math.ceil(
            (vencimiento - hoy) / (1000 * 60 * 60 * 24)
        )

        if (diasRestantes < 0) {
            return {label: "Vencido", color: "red"};
        }

        if (diasRestantes <= 5) {
            return {label: "Próximo a vencer", color: "orange"};
        }

        return {label: "Al día", color: "green"};
    };

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
                            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Estado</th>
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
                                        <Link to={`/servicios/pagos/${servicio.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                            Ver Pagos
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <span className={`px-1 py-1 rounded-full text-xs font-semibold ${getEstadoServicio(servicio).color === "green" ? "bg-green-100 text-green-800" : getEstadoServicio(servicio).color === "orange" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`}>
                                            {getEstadoServicio(servicio).label}
                                        </span>
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
