import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../contexts/auth.context"
import expensesService from '../services/expense.services'

const ExpenseFormEdit = ({ expenseId }) => {

    const { user } = useContext(AuthContext)
    const [expenseEdit, setExpenseEdit] = useState({
        description: '',
        amount: '',
        category: '',
        date: ''
    })

    //Para implementar loader
    // if (!expenseEdit.description || !expenseEdit.amount || !expenseEdit.category || !expenseEdit.date) {
    //     return <p>Cargando...</p>;
    // }

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

    useEffect(() => {
        // TODO: DESACOPLAMOS LLAMADAS A LA API DE MOMNTAJE DE COMPONENTES 
        expensesService
            .getExpense(expenseId)
            .then(({ data }) => {
                console.log(data)
                data.date = formatDate(data.date);
                setExpenseEdit(data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setExpenseEdit({ ...expenseEdit, [name]: value })
    }

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        expensesService
            .editExpense(expenseId, expenseEdit)
            .then(() => navigate(`/categoria/${expenseEdit.category}`))
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="p-12 flex flex-col items-center gap-7">
            <section className="flex flex-col justify-between items-center w-full gap-y-3 md:flex-row md:gap-y-0">
                <select name="category" value={expenseEdit.category} onChange={handleInputChange} className="focus:ring-verde-oscuro focus:border-none focus:outline-none">
                    <option value="Alimentación">Alimentación</option>
                    <option value="Cuentas y pagos">Cuentas y pagos</option>
                    <option value="Hogar">Hogar</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Salud y Belleza">Salud y Belleza</option>
                    <option value="Diversión">Diversión</option>
                    <option value="Otros gastos">Otros gastos</option>
                </select>
                <input type="date" name="date" value={expenseEdit.date} onChange={handleInputChange} className="focus:ring-verde-oscuro focus:border-none focus:outline-none"></input>
            </section>

            <input className="text-center border-0 border-b-2 border-slate-400 placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-verde-oscuro"
                autoFocus
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