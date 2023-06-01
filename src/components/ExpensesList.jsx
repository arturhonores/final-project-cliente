import { Link } from "react-router-dom"

const ExpensesList = ({ expenses }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
            {expenses.map(elm => (
                <Link to={`/detalles/${elm._id}`} key={elm._id} className="rounded-lg shadow-md w-full text-center mt-5">
                    <span>{elm.description}</span> <span>{elm.amount}</span> <span>{elm.category}</span> <span>{elm.date}</span>
                </Link>
            )
            )}
        </div >
    )
}

export default ExpensesList