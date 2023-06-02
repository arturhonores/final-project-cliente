import { Route, Routes } from 'react-router-dom'
import HomepagePage from "../pages/HomepagePage"
import LoginPage from '../pages/LoginPage'
import SingupPage from '../pages/SingupPage'
import ExpensesPage from '../pages/ExpensesPage'
import PrivateRoute from './PrivateRoute'
import CategoryDetailsPage from '../pages/CategoryDetailsPage'

const AppRoutes = () => {
    return (
        <Routes>
            {/* TODO: CERRAR COMPONENTES EN ENTARDA */}
            <Route path='/' element={<HomepagePage />}></Route>
            <Route path='/iniciar-sesion' element={<LoginPage />}></Route>
            <Route path='/registro' element={<SingupPage />}></Route>
            <Route element={<PrivateRoute />}>
                <Route path='/categoria/:category' element={<CategoryDetailsPage />}></Route>
                <Route path='/gastos' element={<ExpensesPage />}></Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes