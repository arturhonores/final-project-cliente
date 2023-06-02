import { useContext, useEffect, useState } from "react"
import ExpensesForm from "../components/ExpensesForm"
import { AuthContext } from "../contexts/auth.context"
import ExpensesList from "../components/ExpensesList"
import expensesService from "../services/expense.services"

const ExpensesPage = () => {

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
                setExpense(ownedExpenses)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-lg shadow-lg w-full pt-12 mt-16 md:w-1/2">
                    <h2 className="text-center">Agregar Gasto</h2>
                    <ExpensesForm loadExpenses={loadExpenses}></ExpensesForm>
                </div>
                {
                    !expenses
                        ?
                        <p>...cargando</p>
                        :
                        <ExpensesList expenses={expenses} ownerId={user._id}></ExpensesList>
                }
            </div>
        </div>
    )
}

export default ExpensesPage