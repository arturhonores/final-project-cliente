import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import expensesService from "../services/expense.services"

const ExpenseDetailsPage = () => {

    const { expense_id } = useParams()

    const [expense, setExpense] = useState({})

    useEffect(() => {
        expensesService
            .getOneExpense(expense_id)
            .then(({ data }) => setExpense(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-lg shadow-lg w-full pt-12 mt-14 md:w-1/2">
                    <h2 className="text-center">Detalles de Categoría</h2>
                    {
                        !expense
                            ?
                            <p>...cargando</p>
                            :
                            <div>
                                <h1>{expense_id}</h1>
                                <h2>{expense.amount}</h2>
                                <h2>{expense.date}</h2>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ExpenseDetailsPage