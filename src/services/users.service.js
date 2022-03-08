import axios from 'axios'

class UsersService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/user` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllUsers = () => {
        return this.api.get('/')
    }

    getFilteredUsers = username => {
        return this.api.get(`/filtered-users/${username}`)
    }

    getOneUser = (id) => {
        return this.api.get(`/${id}`)
    }

    updateOneUser = (id, userData) => {
        return this.api.put(`/${id}`, userData)
    }

    addOneFriend = (id) => {
        return this.api.put(`/${id}/add-friend`)
    }

    removeOneFriend = (id) => {
        return this.api.put(`/${id}/remove-friend`)
    }

    addOnePlace = (id) => {
        return this.api.put(`/${id}/add-place`)
    }

    removeOnePlace = (id) => {
        return this.api.put(`/${id}/remove-place`)
    }

    deleteUser = (id) => {
        return this.api.delete(`/${id}/delete-user`)
    }
}


const usersService = new UsersService()
export default usersService