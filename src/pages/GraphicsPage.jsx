import PieGraphic from '../components/PieGraphic'
import expensesService from '../services/expense.services'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth.context"
import PieGraphicPeriod from '../components/PieGraphicPeriod'

const GraphicsPage = () => {

    const { user } = useContext(AuthContext)
    const [expenses, setExpense] = useState()
    // Define las fechas de inicio y fin por defecto
    const currentYear = new Date().getFullYear();
    const defaultStartDate = `${currentYear}-01-01`;
    const defaultEndDate = new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)
    const [periodExpenses, setPeriodExpenses] = useState()

    useEffect(() => {
        loadExpenses()
    }, [])

    useEffect(() => {
        if (startDate && endDate) {
            loadPeriodExpenses();
        }
    }, [startDate, endDate])

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

    const loadPeriodExpenses = () => {
        expensesService
            .getExpenses()
            .then(({ data }) => {
                const ownedExpenses = data.filter(elm => user._id === elm.owner)

                // Definir las fechas de inicio y fin si no se han establecido
                let start = startDate;
                let end = endDate;
                if (!start || !end) {
                    const currentYear = new Date().getFullYear();
                    start = `${currentYear}-01-01`;
                    end = new Date().toISOString().split('T')[0];

                    setStartDate(start);
                    setEndDate(end);
                }

                const periodExpenses = ownedExpenses.filter(expense => {
                    const expenseDate = new Date(expense.date).getTime();
                    const start = new Date(startDate).getTime();
                    const end = new Date(endDate).getTime();
                    return expenseDate >= start && expenseDate <= end;
                })

                const groupedExpenses = periodExpenses.reduce((acc, expense) => {
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

                setPeriodExpenses(pieData)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center md:flex-row md:gap-x-8">
                <div className="rounded-lg shadow-lg w-full pt-8 mt-14 md:w-1/2 md:h-[22rem]">
                    <h2 className="text-center font-bold text-verde-claro uppercase">Gastos del Mes</h2>
                    <div className='h-72'>
                        {expenses ? <PieGraphic data={expenses}></PieGraphic> : 'cargando...'}
                    </div>
                </div>
                <div className='rounded-lg shadow-lg w-full pt-8 mt-14 md:w-1/2 md:h-[22rem]'>
                    <h2 className="text-center font-bold text-verde-claro uppercase">Gastos por Período</h2>
                    <div className='flex justify-evenly pt-4'>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className='h-72'>
                        {periodExpenses ? <PieGraphicPeriod data={periodExpenses}></PieGraphicPeriod> : <p className='text-center'>...cargando</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphicsPage