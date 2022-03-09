import axios from 'axios'

class ReviewsService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/review` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createReview = (place, reviewData) => {
        return this.api.post(`/${place}/create-review`, reviewData)
    }

    getAllReviews = place => {
        return this.api.get(`/${place}`)
    }

    updateReview = (place, id) => {
        return this.api.put(`/${place}/${id}/update-review`)
    }

    deleteReview = id => {
        return this.api.delete(`/${id}/delete-review`)
    }
}

const reviewsService = new ReviewsService()

export default reviewsService