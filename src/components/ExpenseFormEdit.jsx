import { useEffect, useContext, useState } from 'react'
import { AuthContext } from "../contexts/auth.context"
import expensesService from '../services/expense.services'

const ExpenseFormEdit = ({ expenseId }) => {
    console.log(expenseId)
    const { user } = useContext(AuthContext)
    const [expenseEdit, setExpenseEdit] = useState({
        description: '',
        amount: '',
        category: '',
        date: ''
    })
    useEffect(() => {
        expensesService
            .getExpense(expenseId)
            .then(({ data }) => {
                setExpenseEdit(data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setExpenseEdit({ ...expenseEdit, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className="p-12 flex flex-col items-center gap-7">
            <section className="flex flex-col justify-between items-center w-full gap-y-3 md:flex-row md:gap-y-0">
                <select name="category" value={expenseEdit.category} onChange={handleInputChange} className="focus:ring-verde-oscuro focus:border-none focus:outline-none">
                    <option value="Comida">Comida</option>
                    <option value="Cuentas y pagos">Cuentas y pagos</option>
                    <option value="Hogar">Hogar</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Salud y Belleza">Salud y Belleza</option>
                    <option value="Diversion">Diversion</option>
                    <option value="Otros gastos">Otros gastos</option>
                </select>
                <input type="date" name="date" value={expenseEdit.date} onChange={handleInputChange} className="focus:ring-verde-oscuro focus:border-none focus:outline-none"></input>
            </section>

            <input className="text-center border-0 border-b-2 border-slate-400 placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-verde-oscuro"
                type="text"
                name="description"
                id="description"
                placeholder="Descripción"
                value={expenseEdit.description}
                onChange={handleInputChange}
            />
            <input className="text-center border-0 border-b-2 border-slate-400 placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-verde-oscuro"
                type="number"
                step="0.01"
                name="amount"
                id="amount"
                placeholder="€ 0.0"
                value={expenseEdit.amount}
                onChange={handleInputChange}
            />
            <button type="submit" className="rounded-full bg-verde-claro hover:bg-verde-oscuro text-white w-fit px-4 py-1">Actualizar</button>
        </form>
    )
}

export default ExpenseFormEdit