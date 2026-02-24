import { set, useForm } from 'react-hook-form'
import { getServicioById, nuevoPagoServicio, getServicioPagoByMes, updatePagoServicio } from '../services/servicioServices'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const meses = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
]


const ServicioMesForm = () => {

    const navigate = useNavigate();
    const { id, mes } = useParams();

    const isEdit = Boolean(mes); 

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (!id) return;
        loadFormPagoServicioMes(id, mes);

    }, [id, mes]);


    const formatDateForInput = (date) => {
        if (!date) return "";
        return date.slice(0, 10); // YYYY-MM-DD
    };


    const loadFormPagoServicioMes = async (servicioId, mesParam) => {
        try {
            const servicio = await getServicioById(servicioId);
            if (mesParam) {
                const pago = await getServicioPagoByMes(servicioId, mesParam);
                
                if (!pago) {
                    console.warn('No se encontró pago para', servicioId, mesParam);
                    return;
                }

                setValue("nombre", pago.nombre);
                setValue("anio", pago.anio);
                setValue("mes", pago.mes);
                setValue("monto", pago.monto);
                setValue("fecha_vencimiento", formatDateForInput(pago.fecha_vencimiento));
                setValue("pagado", pago.pagado);
                setValue("fecha_pago", formatDateForInput(pago.fecha_pago));
            } else {
                console.log(servicio)
                setValue("nombre", servicio ? servicio.nombre : "");
                setValue("anio", 2026);
            }
        } catch (err) {
            console.error('Error loading form data:', err);
        }
    };


    const onSubmit = async (data) => {
        
        if (isEdit) {
            await updatePagoServicio(data, id, mes);
        } else {
            await nuevoPagoServicio(id, data);
        }
      

        navigate(`/servicios/pagos/${id}`);
    }

    return (

        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                <h2 className='text-2xl font-bold mb-6'>Agregar pago de Servicio</h2>
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
                        Año
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("anio", { required: true })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Mes
                    </label>
                    <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        {...register("mes", { required: true })}
                    >
                        <option value="">Selecciona un mes</option>
                        {
                            meses.map((mes) => (
                                <option key={mes.value} value={mes.value}>
                                    {mes.label}</option>
                            ))
                        }
                    </select>

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Monto
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("monto", { required: true })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Fecha Vencimiento
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("fecha_vencimiento", { required: true })}
                        type='date'
                    />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">

                    <h3 className="text-gray-700 font-semibold mb-4">
                        Información del Pago
                    </h3>

                    <div className="mb-4">
                        <label className="flex items-center gap-3 text-gray-700 font-medium">
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-emerald-600"
                                {...register("pagado", {
                                    setValueAs: (value) => value ? 1 : 0
                                })}
                            />
                            Pago Realizado
                        </label>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Fecha de Pago
                        </label>
                        <input
                            type="date"
                            className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            {...register("fecha_pago")}
                        />
                    </div>

                </div>



                <div className="flex items-center justify-center mb-4 gap-4">
                    <button
                        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"

                    >
                        Agregar
                    </button>
                    <Link
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                        to={`/servicios/pagos/${id}`}
                        
                    >
                       Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );

};


export default ServicioMesForm;