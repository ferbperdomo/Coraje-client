import { useState } from "react"
import { useNavigate } from "react-router-dom"
import reviewsService from "../../services/review.service"
import { Card } from 'react-bootstrap'

const ReviewForm = () => {

    // el :place de useParams() ??
    // el username de req.payload ?

    const [reviewInfo, setReviewInfo] = useState({
        username: "",
        place: "",
        text: "",
        rating: 0,
        date: ""
    })

    const { username, place, text, rating, date } = reviewInfo

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target

        setReviewInfo({
            ...reviewInfo,
            [name]: value
        })
    }

    function handleSubmit(e) {

        e.preventDefault()

        reviewsService
            .createReview({ username, place, text, rating, date })
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>¿Qué te gustaría decir sobre este establecimiento?</Form.Label>
                    <Form.Control as="textarea" name="text" value={text} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Añade una puntuación</Form.Label>
                    <Form.Select name="rating" value={rating} onChange={handleInputChange}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Añadir valoración
                </Button>
            </Form>

        </>
    )
}

export default ReviewForm