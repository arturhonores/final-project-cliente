import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllUsers() {
        return this.api.get('/getAllUsers')
    }

    userDetails(user_id) {
        return this.api.get(`/${user_id}`)
    }

    userEdit(id, userData) {
        return this.api.put(`/${id}/edit`, userData)
    }

    userDelete(user_id) {
        return this.api.delete(`/${user_id}/delete`)
    }
}
const usersService = new UserService()

export default usersService