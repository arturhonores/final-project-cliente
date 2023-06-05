import { Route, Routes } from 'react-router-dom'
import HomePage from "../components/HomePage"
import LoginPage from '../pages/LoginPage'
import SingupPage from '../pages/SingupPage'
import ExpensesPage from '../pages/ExpensesPage'
import PrivateRoute from './PrivateRoute'
import CategoryDetailsPage from '../pages/CategoryDetailsPage'
import EditExpense from '../pages/EditExpense'
import GraphicsPage from '../pages/GraphicsPage'
import EditPerfilPage from '../pages/EditPerfilPage'

const AppRoutes = () => {
    return (
        <Routes>
            {/* TODO: CERRAR COMPONENTES EN ENTARDA */}
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/iniciar-sesion' element={<LoginPage />}></Route>
            <Route path='/registro' element={<SingupPage />}></Route>
            <Route element={<PrivateRoute />}>
                <Route path='/categoria/:category' element={<CategoryDetailsPage />}></Route>
                <Route path='/editar/:gasto' element={<EditExpense />}></Route>
                <Route path='/gastos' element={<ExpensesPage />}></Route>
                <Route path='/graficos' element={<GraphicsPage />}></Route>
                <Route path='/editar-perfil' element={<EditPerfilPage />}></Route>
            </Route>
            {/* <Route path='*' element={<NotFoundPage />} /> */}
        </Routes>
    )
}

export default AppRoutes