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


// // te dejo el código aquí abajo
// // como tú decías hay dos maneras de hacerlo, en cliente y en servidor.
// // Creo que esta es la más sencilla, directamente en cliente. A ver si te convence.

// import { Link } from "react-router-dom"

// const ExpensesList = ({ expenses }) => {
//   // Calcula el total sum de los expenses en una categoria
//   const calculateTotal = (category) => {
//     const categoryExpenses = expenses.filter((expense) => expense.category === category)
//     const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
//     return total;
//   }

//   return (
//     <div className="flex flex-col justify-center items-center w-full md:w-1/2">
//       {/* Muestra el total sum de cada categoria */}
//       <div className="mt-5">
//         <h3>Total Expenses by Category:</h3>
//         <ul>
//           {Array.from(new Set(expenses.map((expense) => expense.category))).map((category) => (
//             <li key={category}>
//               {category}: {calculateTotal(category)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default ExpensesList

// // la linea 39 quizá es la más compleja, el Set es un objeto con el array de categorias, su estructura guarda
// // solo valores únicos, de modo que no repetirá categorías.
// // Array.from crea un array del Set
// // finalmente lo mapea para sacar el calculateTotal de la linea 41

//muchas gracias ruben!!
