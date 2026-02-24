import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServicioPagos, deleteServicioPagoMesById } from "../services/servicioServices.js";
import { Link } from "react-router-dom";
import { Pencil, Trash2, CreditCard } from "lucide-react";


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

const ServicioMeses = () => {

    const { id } = useParams(); // acá llega el ID del servicio
    const [serviciosMeses, setServiciosMeses] = useState([]);

    useEffect(() => {
        if (id) {
            loadServiciosMeses(id);
        }
    }, [id]);

    const loadServiciosMeses = async (servicioId) => {
        const data = await getServicioPagos(servicioId);
        console.log(data)
        setServiciosMeses(data);
    };

    const handleRemoveServicioPagoMes = async (servicioId, mes) => {
        alert("¿Confirma que desea eliminar este pago del servicio?")
        await deleteServicioPagoMesById(servicioId, mes);
        loadServiciosMeses(servicioId);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }





    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <Link
                    to="/servicios"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition"
                >
                    Volver
                </Link>

                <Link
                    to={`/servicios/agregar-pago/${id}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition duration-200"
                >
                    + Agregar Pago
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-4">
                Detalle Servicio por Mes 
            </h1>

            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-4 px-6 text-left">Mes</th>
                            <th className="py-4 px-6 text-left">Monto</th>
                            <th className="py-4 px-6 text-left">Vencimiento</th>
                            <th className="py-4 px-6 text-left">Pagado</th>
                            <th className="py-4 px-6 text-left">Fecha Pago</th>
                            <th className="py-4 px-6 text-center">Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {serviciosMeses.map((servicioMes) => (
                            <tr key={servicioMes.id}>
                                <td className="py-4 px-6 border-b">{meses.find(m => m.value === servicioMes.mes)?.label || servicioMes.mes}</td>
                                <td className="py-4 px-6 border-b">${Number(servicioMes.monto).toFixed(2)}</td>
                                <td className="py-4 px-6 border-b">{formatDate(servicioMes.fecha_vencimiento)}</td>
                                <td className="py-4 px-6 border-b">
                                    {servicioMes.pagado ? "Sí" : "No"}
                                </td>
                                <td className="py-4 px-6 border-b">
                                    {servicioMes.fecha_pago ? formatDate(servicioMes.fecha_pago) : "—"}
                                </td>
                                <td className="py-4 px-6 border-b">
                                    <div className="flex items-center gap-3">
                                    <Link className="p-2 hover:bg-gray-100 rounded" to={`/servicios/editar-pago/${id}/mes/${servicioMes.mes}`}>
                                        <Pencil size={18}/>
                                    </Link>
                                    
                                    <button 
                                    className="p-2 hover:bg-gray-100 rounded"
                                    onClick={() => handleRemoveServicioPagoMes(id, servicioMes.mes)}>
                                        <Trash2 size={18}/>
                                    </button>

                                    <button 
                                    className="p-2 hover:bg-gray-100 rounded" 
                                    >
                                        <CreditCard size={18}/>
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ServicioMeses;