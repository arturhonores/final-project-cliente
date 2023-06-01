
const ExpensesList = ({ expenses }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
            {expenses.map(elm => (
                <div key={elm._id} className="rounded-lg shadow-md w-full text-center mt-5" >
                    <span>{elm.description}</span> <span>{elm.amount}</span> <span>{elm.category}</span> <span>{elm.date}</span>
                </div>
            )
            )}
        </div >
    )
}

export default ExpensesList