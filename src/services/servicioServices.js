const API_BASE_URL = "http://localhost:3000"


export const getAllServicios = async () => {
  const response = await fetch(`${API_BASE_URL}/servicios`);
  if (!response.ok) throw new Error("Error al obtener servicios");
  return response.json();
};

export const createServicio = async (servicio) => {
    const response = await fetch(`${API_BASE_URL}/servicios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(servicio)
    });
};

export const deleteServicio = async (id) => {
    const response = await fetch(`${API_BASE_URL}/servicios/${id}`, {
        method: "DELETE"
    });
};

export const getServiciosResumen = async () => {
    const response = await fetch(`${API_BASE_URL}/servicios/resumen`);
    if (!response.ok) throw new Error("Error al obtener resumen de servicios");
    return response.json(); 
};

export const getServicioPagos = async (servicioId) => {
    console.log(servicioId);
    const response = await fetch(`${API_BASE_URL}/servicios/pagos/${servicioId}`);
    if (!response.ok) throw new Error("Error al obtener pagos del servicio");
    const text = await response.text();
    if (!text) return [];
    try { return JSON.parse(text); } catch (err) { throw new Error('Error parsing JSON from getServicioPagos: ' + err.message); }
}


export const getServicioById = async (servicioId) => {
    const response = await fetch(`${API_BASE_URL}/servicios/${servicioId}`);
    if (!response.ok) throw new Error("Error al obtener servicio por ID");
    const text = await response.text();
    if (!text) return null;
    try { return JSON.parse(text); } catch (err) { throw new Error('Error parsing JSON from getServicioById: ' + err.message); }
}


export const nuevoPagoServicio = async (servicioId, pagoData) => {
    const response = await fetch(`${API_BASE_URL}/servicios/pagos/${servicioId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pagoData)
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error('Error creating pago: ' + (errText || response.statusText));
    }
};

export const updatePagoServicio = async (data, servicioId, mes) => {
    console.log(servicioId, mes)
    const response = await fetch(`${API_BASE_URL}/servicios/pagos/${servicioId}/mes/${mes}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error('Error updating pago: ' + (errText || response.statusText));
    }
};

export const getServicioPagoByMes = async (servicioId, mes) => {
    console.log(servicioId, mes)
    const response = await fetch(`${API_BASE_URL}/servicios/pagos/${servicioId}/mes/${mes}`);
    if (!response.ok) throw new Error("Error al obtener pago del servicio por mes");
    const text = await response.text();
    if (!text) return null;
    try { return JSON.parse(text); } catch (err) { throw new Error('Error parsing JSON from getServicioPagoByMes: ' + err.message); }
}

export const deleteServicioPagoMesById = async (servicioId, mes) => {
    const response = await fetch(`${API_BASE_URL}/servicios/pagos/${servicioId}/mes/${mes}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error('Error deleting pago: ' + (errText || response.statusText));
    }
};

