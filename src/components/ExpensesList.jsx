import { Link } from "react-router-dom"

const ExpensesList = ({ expenses, ownerId }) => {
    // Calcula el total sum de los expenses en una categoria
    const calculateTotal = (category) => {
        const categoryExpenses = expenses.filter((expense) => expense.category === category)
        const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        return total;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
            {
                Array.from(new Set(expenses.map((expense) => expense.category))).map((category) => (
                    <Link to={`/categoria/${category}`} key={category} className="w-full">
                        <div className="rounded-lg shadow-sm mt-5 px-4 flex justify-between">
                            <p>{category}</p><p>{calculateTotal(category)}</p>
                        </div>
                    </Link>
                ))
            }
        </div >
    )
}

export default ExpensesList
