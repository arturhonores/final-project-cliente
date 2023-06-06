import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth.context"
import { Link, useParams } from "react-router-dom"
import ExpenseFormEdit from "../components/ExpenseFormEdit"

const EditExpense = () => {
    const { user } = useContext(AuthContext)
    const { expense } = useParams()

    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-lg shadow-lg w-full pt-8 mt-14 md:w-1/2">
                    <h2 className="text-center">Editar Gasto</h2>
                    <ExpenseFormEdit expenseId={expense} />
                </div>
            </div>
        </div>
    )
}

export default EditExpense