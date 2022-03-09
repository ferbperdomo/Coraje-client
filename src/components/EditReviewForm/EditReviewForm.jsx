import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import reviewsService from "../../services/review.service"

const EditReviewForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [reviewInfo, setReviewInfo] = useState({
        username: "",
        place: "",
        text: "",
        rating: "",
        date: ""
    })

    const { username, place, text, rating, date } = reviewInfo

    useEffect(() => {
        loadReview()
    }, [])

    const loadReview = () => {
        reviewsService
            .updateReview(id)
    }
}