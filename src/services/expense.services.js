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

    getOneExpense(expense_id) {
        return this.api.get(`/getOneExpense/${expense_id}`)
    }

    saveExpense(ExpenseData) {
        return this.api.post('/saveExpense', ExpenseData)
    }
}

const expensesService = new ExpenseService()

export default expensesService