import ExpensesForm from "../components/ExpensesForm"

const ExpensesPage = () => {
    return (
        <div className="">
            <div className="max-w-7xl px-4 mx-auto">
                <div className="h-screen flex flex-col justify-center items-center">
                    <div className="rounded-lg shadow-md">
                        <ExpensesForm></ExpensesForm>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpensesPage