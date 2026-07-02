import './App.css'
import Layout from './components/Layout'
import { Routes, Route } from "react-router-dom"
import ServicioForm from './pages/ServicioForm'
import ServicioDelete from './pages/ServicioDelete'
import ServicioList from './pages/ServicioList'
import Home from './pages/Home'
import ServicioMeses from './pages/ServicioMeses'
import ServicioMesForm from './pages/ServicioMesForm'
import Gastos from './pages/Gastos'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<ServicioList />} />
          <Route path="servicios/create" element={<ServicioForm />} />
          <Route path="servicios/delete" element={<ServicioDelete />} />
          <Route path="servicios/agregar-pago/:id" element={<ServicioMesForm />} />
          <Route path="servicios/pagos/:id" element={<ServicioMeses />} />
          <Route path="servicios/editar-pago/:id/mes/:mes" element={<ServicioMesForm />} />
          <Route path="servicios/gastos" element={<Gastos />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
