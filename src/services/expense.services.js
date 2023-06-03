import axios from 'axios'

class ExpenseService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/expenses`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getExpenses() {
        return this.api.get('/getAllExpenses')
    }

    getExpense(expenseId) {
        return this.api.get(`/getExpense/${expenseId}`)
    }

    deleteExpense(expenseId) {
        return this.api.delete(`/deleteExpense/${expenseId}`)
    }

    getCategory(category) {
        return this.api.get(`/getCategory/${category}`)
    }

    saveExpense(ExpenseData) {
        return this.api.post('/saveExpense', ExpenseData)
    }

}

const expensesService = new ExpenseService()

export default expensesService