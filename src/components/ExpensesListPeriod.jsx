import { useEffect, useState, useCallback } from "react"
import { AiOutlineEuro, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiHome, BiTaxi } from 'react-icons/bi'
import { GiClothes } from 'react-icons/gi'
import { MdOutlineHealthAndSafety, MdOutlineFoodBank } from 'react-icons/md'
import { GrGamepad } from 'react-icons/gr'
import { Link } from "react-router-dom"
import { HiOutlineArrowLongRight } from "react-icons/hi2"
import Loader from "./Loader"

const ExpensesListPeriod = ({ expenses }) => {
    // Define las fechas de inicio y fin por defecto
    const currentYear = new Date().getFullYear();
    const defaultStartDate = `${currentYear}-01-01`;
    const defaultEndDate = new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)
    const [periodExpenses, setPeriodExpenses] = useState({})
    const [totalExpenses, setTotalExpenses] = useState(0);

    //Cálculo de total de categorías por período
    useEffect(() => {
        const total = Object.values(periodExpenses).reduce((acc, value) => acc + value, 0);
        setTotalExpenses(total);
    }, [periodExpenses]);

    const loadPeriodExpenses = useCallback(() => {
        const periodExpenses = expenses.filter(expense => {
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

        setPeriodExpenses(groupedExpenses);
    }, [expenses, startDate, endDate]);

    useEffect(() => {
        if (startDate && endDate) {
            loadPeriodExpenses();
        }
    }, [startDate, endDate, expenses, loadPeriodExpenses]);

    const categoryIcons = {
        "Alimentación": <MdOutlineFoodBank />,
        "Cuentas y pagos": <AiOutlineEuro />,
        "Hogar": <BiHome />,
        "Transporte": <BiTaxi />,
        "Ropa": <GiClothes />,
        "Salud y Belleza": <MdOutlineHealthAndSafety />,
        "Diversión": <GrGamepad />,
        "Otros gastos": <AiOutlineShoppingCart />
    }

    return (
        <div className='w-full mt-5'>
            <div className='flex justify-evenly items-center w-full'>
                <input type="date" className="focus:border-none focus:outline-none focus:ring-verde-claro" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <p><HiOutlineArrowLongRight /></p>
                <input type="date" className="focus:border-none focus:outline-none focus:ring-verde-claro" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className='w-full'>
                {
                    Object.keys(periodExpenses).length > 0
                        ?
                        Object.keys(periodExpenses).map((category, index) => (
                            <Link to={`/categoria/${category}`} key={index}>
                                <div className="rounded-lg shadow-sm mt-5 px-4 flex justify-between items-center hover:bg-neutral-200 active:bg-neutral-200">
                                    <p className="flex items-center gap-x-2"><span className='text-xl'>{categoryIcons[category]}</span>{category}</p> <p>€ {periodExpenses[category].toFixed(2)}</p>
                                </div>
                            </Link>
                        ))
                        :
                        <div className='text-center'><Loader></Loader></div>
                }
                <div className='rounded-lg shadow-sm mt-5 px-4 flex justify-between items-center w-full text-verde-oscuro font-bold'><span>TOTAL</span><span>€ {totalExpenses.toFixed(2)}</span></div>
            </div>
        </div>
    )
}

export default ExpensesListPeriod
