import React from "react";
import { getServiciosResumen, deleteServicio } from "../services/servicioServices";
import { useEffect, useState } from 'react';


const ServicioDelete = () => {


    const [servicio, setServicio] = useState([])

    useEffect(() => {
        loadServicio();
    })

    const loadServicio = async() => {
        try {
            const data = await getServiciosResumen();
            setServicio(data)
        } catch (error) {
            console.error("Error al cargar servicios:", error);
        }
    };

    const handleDelete = async (id) => {
        await deleteServicio(id);
        loadServicio(); // Recargar la lista después de eliminar
    }



  return (
    <>
         <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                <h2 className='text-2xl font-bold mb-6'>Eliminar Servicio</h2>
            </div>

                 <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Servicio</th>
                            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Acción</th>
                        </tr>
                    </thead>
                    {
                        <tbody className="bg-white">
                            {servicio.map(servicio => (
                                <tr key={servicio.id}>
                                    <td className="py-4 px-6 border-b border-gray-200">{servicio.nombre}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <button 
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDelete(servicio.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
    
                    }
                </table>

            </div>
        </div>
    </> )

};

export default ServicioDelete;