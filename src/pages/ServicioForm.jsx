import React from 'react'
import { useForm } from 'react-hook-form'
import { createServicio } from '../services/servicioServices'
import { useNavigate } from 'react-router-dom'

const ServicioForm = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        await createServicio(data);
        navigate("/servicios");
    }

    return (

        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                <h2 className='text-2xl font-bold mb-6'>Agregar nuevo Servicio</h2>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="py-4 px-6"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Nombre Servicio
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("nombre", { required: true })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Descripción
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("descripcion", { required: true })}
                    />
                </div>
                {
    
                }
                 <div className="flex items-center justify-center mb-4">
            <button
                className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
    
            >
                Agregar
            </button>
        </div>
            </form>
        </div>
    )
}

export default ServicioForm;
