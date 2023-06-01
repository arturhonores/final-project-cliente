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

    //pruebas
    getUserExpensesByCategory(user_id) {
        return this.api.get(`/getUserExpenses/${user_id}`)
            .then(response => {
                const expenses = response.data;

                let categorySums = {};
                for (let expense of expenses) {
                    if (expense.category in categorySums) {
                        categorySums[expense.category] += expense.amount;
                    } else {
                        categorySums[expense.category] = expense.amount;
                    }
                }

                return categorySums;
            })
    }
    ///
}

const expensesService = new ExpenseService()

export default expensesService