
const ExpensesList = ({ expenses }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
            {expenses.map(elm => (
                <div key={elm._id} className="rounded-lg shadow-md w-full bg-yellow-500" >
                    <p>{elm.amount}</p>
                </div>
            )
            )}
        </div >
    )
}

export default ExpensesList