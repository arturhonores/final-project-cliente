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
                const currentYear = new Date().getFullYear()
                const currentMonth = new Date().getMonth() + 1; // +1 because months in JavaScript are 0-based, but are stored as 1-based
                const currentMonthExpenses = ownedExpenses.filter(expense => {
                    const [expenseYear, expenseMonth] = expense.date.split("-") // divides the date into year and month
                    return expenseYear == currentYear && expenseMonth == currentMonth // compares with the current year and month
                })

                const groupedExpenses = currentMonthExpenses.reduce((acc, expense) => {
                    if (!acc[expense.category]) {
                        acc[expense.category] = 0;
                    }
                    acc[expense.category] += expense.amount;
                    return acc;
                }, {});

                const pieData = Object.keys(groupedExpenses).map(category => ({
                    id: category,
                    label: category,
                    value: groupedExpenses[category],
                }));

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
