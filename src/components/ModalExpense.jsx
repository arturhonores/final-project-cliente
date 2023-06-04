import expensesService from "../services/expense.services"

const ModalExpense = ({ showModal, setShowModal, expense, loadListExpenses }) => {
    const handleDelete = () => {
        expensesService
            .deleteExpense(expense._id)
            .then(() => {
                setShowModal(false)
                loadListExpenses()
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={() => setShowModal(false)}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm min-w-[20rem]" onClick={e => e.stopPropagation()}>
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl text-center font-semibold">
                                        <p>€ {expense.amount}</p>
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-base leading-relaxed">
                                        Descripción: {expense.description}
                                    </p>
                                    <p className="my-4 text-slate-500 text-base leading-relaxed">
                                        Categoría: {expense.category}
                                    </p>
                                    <p className="my-4 text-slate-500 text-base leading-relaxed">
                                        Día: {new Date(expense.date).toLocaleDateString()}
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-red-400 text-white active:bg-red-600 hover:bg-red-600 font-bold uppercase text-xs px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleDelete}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default ModalExpense