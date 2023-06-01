import { Route, Routes } from 'react-router-dom'
import HomepagePage from "../pages/HomepagePage"
import LoginPage from '../pages/LoginPage'
import SingupPage from '../pages/SingupPage'
import ExpensesPage from '../pages/ExpensesPage'
import PrivateRoute from './PrivateRoute'
import ExpenseDetailsPage from '../pages/ExpenseDetailsPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomepagePage></HomepagePage>}></Route>
            <Route path='/iniciar-sesion' element={<LoginPage></LoginPage>}></Route>
            <Route path='/registro' element={<SingupPage></SingupPage>}></Route>
            <Route path='/detalles/:expense_id' element={<ExpenseDetailsPage></ExpenseDetailsPage>}></Route>

            <Route path='/gastos' element={<PrivateRoute></PrivateRoute>}>
                <Route path='' element={<ExpensesPage></ExpensesPage>}></Route>

            </Route>
        </Routes>
    )
}

export default AppRoutes