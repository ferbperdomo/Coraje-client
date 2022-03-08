import axios from 'axios'

class PlacesService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/places` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllPlaces = () => {
        return this.api.get('/')
    }

    createOnePlace = (data) => {
        return this.api.post('/save-place', data)
    }

    getOnePlace = (id) => {
        return this.api.get(`/${id}`)
    }

    updateOnePlace = (id, placeData) => {
        return this.api.put(`/${id}/update-place`, placeData)
    }

    deleteOnePlace = (id) => {
        return this.api.delete(`/${id}/delete-place`)
    }
}


const placesService = new PlacesService()

export default placesService