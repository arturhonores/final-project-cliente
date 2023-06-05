import { Link } from "react-router-dom"
import { AiOutlineEuro, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiHome, BiTaxi } from 'react-icons/bi'
import { GiClothes } from 'react-icons/gi'
import { MdOutlineHealthAndSafety, MdOutlineFoodBank } from 'react-icons/md'
import { GrGamepad } from 'react-icons/gr'

const ExpensesList = ({ expenses }) => {
    // Calcula el total sum de los expenses en una categoria
    const calculateTotal = (category) => {
        const categoryExpenses = expenses.filter((expense) => expense.category === category)
        const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        return total.toFixed(2);
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

    const calculateTotalExpenses = () => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
        return total.toFixed(2);
    }

    return (
        <>
            {
                Array.from(new Set(expenses.map((expense) => expense.category))).map((category) => (
                    <Link to={`/categoria/${category}`} key={category} className="w-full">
                        <div className="rounded-lg shadow-sm mt-5 px-4 flex justify-between items-center">
                            <p className="flex items-center gap-x-2"><span className="text-xl">{categoryIcons[category]}</span>{category}</p><p>€ {calculateTotal(category)}</p>
                        </div>
                    </Link>
                ))
            }
            <div className="rounded-lg shadow-sm mt-5 px-4 flex justify-between items-center w-full text-verde-oscuro font-bold">
                <p>TOTAL</p><p>€ {calculateTotalExpenses()}</p>
            </div>
        </>
    )
}

export default ExpensesList
