import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth.context"
import expensesService from "../services/expense.services"
import { Link, useParams } from "react-router-dom"
import ModalExpense from "../components/ModalExpense"
import { BiEditAlt, BiHome, BiTaxi } from "react-icons/bi"
import { AiOutlineEuro, AiOutlineShoppingCart } from 'react-icons/ai'
import { GiClothes } from 'react-icons/gi'
import { MdOutlineHealthAndSafety, MdOutlineFoodBank } from 'react-icons/md'
import { GrGamepad } from 'react-icons/gr'

const CategoryDetailsPage = () => {

    const { user } = useContext(AuthContext)
    const { category } = useParams()
    const [categoryList, setCategoryList] = useState()
    const [showModal, setShowModal] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState(null);

    const loadListExpenses = () => {
        expensesService
            .getCategory(category)
            .then(({ data }) => {
                const ownerCategoryList = data.filter(elm => user._id === elm.owner)
                setCategoryList(ownerCategoryList)
            }
            )
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadListExpenses()
    }, [])

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

    const capitalize = (str) => {
        if (typeof str !== 'string' || !str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-lg shadow-lg w-full pt-8 mt-14 md:w-1/2">
                    <p className="flex justify-center text-2xl">{categoryIcons[category]}</p>
                    <h2 className="text-center text-azul-oscuro uppercase font-bold pt-2 pb-4">Gastos de {category}</h2>
                    {!categoryList ? (
                        <p>...cargando</p>
                    ) : (
                        <ul>
                            {categoryList.map((elm) => (
                                <li className="flex justify-between px-4 pt-3 pb-2 shadow-sm" key={elm._id} ><p className="cursor-pointer" onClick={() => { setShowModal(true); setSelectedExpense(elm) }}>{capitalize(elm.description)}</p> <div className="flex items-center gap-x-2"><p>€ {elm.amount.toFixed(2)}</p><Link to={`/editar/${elm._id}`}><span><BiEditAlt></BiEditAlt></span></Link></div></li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {showModal && <ModalExpense showModal={showModal} setShowModal={setShowModal} expense={selectedExpense} loadListExpenses={loadListExpenses} />}
        </div>
    );
}

export default CategoryDetailsPage