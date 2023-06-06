import { useContext, useEffect, useState } from "react"
import ExpensesForm from "../components/ExpensesForm"
import { AuthContext } from "../contexts/auth.context"
import ExpensesList from "../components/ExpensesList"
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
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center md:flex-row md:gap-x-8">
                <div className="rounded-lg shadow-lg w-full pt-12 mt-16 md:mt-0 md:w-1/2 ">
                    <h2 className="text-center text-azul-oscuro uppercase font-bold">Agregar Gasto</h2>
                    <ExpensesForm loadExpenses={loadExpenses}></ExpensesForm>
                </div>
                <div className="flex flex-col justify-center items-center w-full md:w-1/2">
                    {/* <h2 className="uppercase text-azul-oscuro font-bold">Gastos del Mes</h2>
                    {
                        !expenses
                            ?
                            <p>...cargando</p>
                            :
                            <ExpensesList expenses={expenses}></ExpensesList>
                    } */}
                    <TabsCategoryExpenses></TabsCategoryExpenses>
                </div>
            </div>
        </div>
    )
}

export default PruebaPage