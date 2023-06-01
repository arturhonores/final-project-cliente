import { useState } from "react"
import expensesService from "../services/expense.services"

const ExpensesForm = () => {

    const [expenseData, setExpenseData] = useState({
        description: '',
        amount: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setExpenseData({ ...expenseData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        expensesService
            .saveExpense(expenseData)
            .then(() => alert("Done"))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-12 flex flex-col items-center gap-7">
                <section className="flex flex-col justify-between items-center w-full md:flex-row">
                    <select>
                        <option value="">opcion 1</option>
                        <option value="">opcion 2</option>
                        <option value="">opcion 3</option>
                    </select>
                    <div>Day-picker</div>
                </section>

                <input className="text-center border-0 border-b-2 border-slate-400 placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-verde-oscuro"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Descripción"
                    value={expenseData.description}
                    onChange={handleInputChange}
                />
                <input className="text-center border-0 border-b-2 border-slate-400 placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-verde-oscuro"
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="€ 0.0"
                    value={expenseData.amount}
                    onChange={handleInputChange}
                />
                <button type="submit" className="rounded-full bg-verde-claro text-white w-fit px-4 py-1">Agregar Gasto</button>
            </form>
        </div>
    )
}

export default ExpensesForm