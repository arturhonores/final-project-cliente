import PieGraphic from '../components/PieGraphic'
import expensesService from '../services/expense.services'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth.context"

const GraphicsPage = () => {

    const { user } = useContext(AuthContext)
    const [expenses, setExpense] = useState()

    useEffect(() => {
        loadExpenses()
    }, [])


    const loadExpenses = () => {
        expensesService
            .getExpenses()
            .then(({ data }) => {
                const ownedExpenses = data.filter(elm => user._id === elm.owner)
                // Obteniendo año y mes actual
                const currentYear = new Date().getFullYear()
                const currentMonth = new Date().getMonth() + 1; // +1 porque los meses en JavaScript son base 0, pero se guardan como base 1
                // Filtra los gastos para incluir solamente los del mes actual
                const currentMonthExpenses = ownedExpenses.filter(expense => {
                    const [expenseYear, expenseMonth] = expense.date.split("-") // divide la fecha en año y mes
                    return expenseYear == currentYear && expenseMonth == currentMonth // compara con el año y mes actuales
                })

                const pieData = currentMonthExpenses.map(expense => ({
                    id: expense.category,
                    label: expense.category,
                    value: expense.amount,
                }))

                setExpense(pieData)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-lg shadow-lg w-full pt-8 mt-14 md:w-1/2">
                    <h2 className="text-center font-bold text-verde-claro uppercase">Gastos del Mes</h2>
                    <div className='h-72'>
                        {expenses ? <PieGraphic data={expenses}></PieGraphic> : 'cargando...'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphicsPage