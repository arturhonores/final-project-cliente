import { useState } from "react"
import expensesService from "../services/expense.services"

const ExpensesForm = ({ loadExpenses }) => {

    const [expenseData, setExpenseData] = useState({
        description: '',
        amount: '',
        category: 'Cuentas y pagos',
        date: formatDate(new Date())
    })

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setExpenseData({ ...expenseData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        expensesService
            .saveExpense(expenseData)
            .then(() => {
                loadExpenses()
                setExpenseData({
                    description: '',
                    amount: '',
                    category: 'Cuentas y pagos',
                    date: formatDate(new Date())
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit} className="p-12 flex flex-col items-center gap-7">
            <section className="flex flex-col justify-between items-center w-full gap-y-3 md:flex-row md:gap-y-0">
                <select name="category" value={expenseData.category} onChange={handleInputChange} className="focus:ring-verde-oscuro focus:border-none focus:outline-none">
                    <option value="Alimentación">Alimentación</option>
                    <option value="Cuentas y pagos">Cuentas y pagos</option>
                    <option value="Hogar">Hogar</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Salud y Belleza">Salud y Belleza</option>
                    <option value="Diversión">Diversión</option>
                    <option value="Otros gastos">Otros gastos</option>
                </select>
                <input type="date" name="date" value={expenseData.date} onChange={handleInputChange} className="focus:ring-verde-oscuro focus:border-none focus:outline-none"></input>
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
                step="0.01"
                name="amount"
                id="amount"
                placeholder="€ 0.0"
                value={expenseData.amount}
                onChange={handleInputChange}
            />
            <button type="submit" className="rounded-full bg-verde-oscuro hover:bg-verde-claro active:bg-verde-claro text-white w-fit px-4 py-1 font-bold">Agregar Gasto</button>
        </form>
    )
}

export default ExpensesForm