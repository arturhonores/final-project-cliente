import expensesService from '../services/expense.services'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth.context"
import { Link } from "react-router-dom"
import { AiOutlineEuro, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiHome, BiTaxi } from 'react-icons/bi'
import { GiClothes } from 'react-icons/gi'
import { MdOutlineHealthAndSafety, MdOutlineFoodBank } from 'react-icons/md'
import { GrGamepad } from 'react-icons/gr'

const ExpensesListPeriod = () => {
    const { user } = useContext(AuthContext)

    // Define las fechas de inicio y fin por defecto
    const currentYear = new Date().getFullYear();
    const defaultStartDate = `${currentYear}-01-01`;
    const defaultEndDate = new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)
    const [periodExpenses, setPeriodExpenses] = useState({})

    useEffect(() => {
        if (startDate && endDate) {
            loadPeriodExpenses();
        }
    }, [startDate, endDate])

    const loadPeriodExpenses = () => {
        expensesService
            .getExpenses()
            .then(({ data }) => {
                const ownedExpenses = data.filter(elm => user._id === elm.owner)
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

                setPeriodExpenses(groupedExpenses)
            })
            .catch(err => console.log(err))
    }

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
            <div className='flex justify-evenly w-full'>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className='w-full'>
                {
                    Object.keys(periodExpenses).length > 0
                        ?
                        Object.keys(periodExpenses).map((category, index) => (
                            <div className="rounded-lg shadow-sm mt-5 px-4 flex justify-between items-center" key={index}>
                                <p className="flex items-center gap-x-2"><span className='text-xl'>{categoryIcons[category]}</span>{category}</p> <p>€ {periodExpenses[category]}</p>
                            </div>
                        ))
                        :
                        <p className='text-center'>...cargando</p>
                }
            </div>
        </div>
    )
}

export default ExpensesListPeriod
