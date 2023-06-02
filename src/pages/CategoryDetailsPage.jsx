import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth.context"
import expensesService from "../services/expense.services"
import { useParams } from "react-router-dom"

const CategoryDetailsPage = () => {

    const { user } = useContext(AuthContext)
    const { category } = useParams()

    // console.log(user._id, category)

    const [categoryList, setCategoryList] = useState()

    useEffect(() => {

        expensesService
            .getCategory(category)
            .then(({ data }) => {
                const ownerCategoryList = data.filter(elm => user._id === elm.owner)
                setCategoryList(ownerCategoryList)
            }
            )
            .catch(err => console.log(err))

    }, [])


    return (
        <div className="max-w-7xl px-4 mx-auto">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="rounded-lg shadow-lg w-full pt-12 mt-14 md:w-1/2">
                    <h2 className="text-center">Gastos de {category}</h2>
                    {!categoryList ? (
                        <p>...cargando</p>
                    ) : (
                        <ul>
                            {categoryList.map((elm) => (
                                <li className="flex justify-between px-4" key={elm._id}><p>{elm.description}</p> <p>{elm.amount}</p></li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryDetailsPage