
const ExpensesForm = () => {
    return (
        <div>
            <form action="" className="p-12 flex flex-col items-center gap-7">
                <input className="text-center border-0 border-b-2 border-slate-400 placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-verde-oscuro"
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                // value={inputDescripcion}
                // onChange={handleChange}
                />
                <input className="text-center border-0 border-b-2 border-slate-400 placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-verde-oscuro"
                    type="text"
                    name="amount"
                    placeholder="€ 0.0"
                // value={inputDescripcion}
                // onChange={handleChange}
                />
                <button type="submit" className="rounded-full bg-verde-claro text-white w-fit px-4 py-1">Agregar Gasto</button>
            </form>
        </div>
    )
}

export default ExpensesForm