import { useContext, useEffect, useState } from "react"
import ExpensesForm from "../components/ExpensesForm"
import { AuthContext } from "../contexts/auth.context"
import expensesService from "../services/expense.services"
import TabsCategoryExpenses from '../components/TabsCategoryExpenses'

const PruebaPage = () => {

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
                setExpense(currentMonthExpenses)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="max-w-7xl px-4 mx-auto mt-14 flex flex-col items-center gap-y-8 md:h-screen md:mt-0 md:flex-row md:gap-x-8 md:gap-y-0 md:justify-center md:items-center">
            <div className="rounded-lg shadow-lg w-full pt-8 md:mt-0 md:w-1/2 ">
                <h2 className="text-center text-azul-oscuro uppercase font-bold">Agregar Gasto</h2>
                <ExpensesForm loadExpenses={loadExpenses}></ExpensesForm>
            </div>
            <div className="flex flex-col justify-center items-center w-full md:w-1/2">
                {!expenses
                    ?
                    <p>...cargando</p>
                    :
                    <TabsCategoryExpenses expenses={expenses}></TabsCategoryExpenses>
                }
            </div>
        </div>
    )
}

export default PruebaPage