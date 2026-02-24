export const routes = [
    {
        path: "/", 
        children: [
            {path: "servicios", element: <ServicioList></ServicioList>},
            {path: "servicios/create", element: <ServicioForm></ServicioForm>},
        ]
    }
]