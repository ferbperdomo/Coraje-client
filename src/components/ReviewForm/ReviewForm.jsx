import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import reviewsService from "../../services/review.service"
import { Form, Button } from 'react-bootstrap'

const ReviewForm = ({ closeReview }) => {

    const [reviewInfo, setReviewInfo] = useState({
        text: "",
        rating: 0,
        date: ""
    })

    const { text, rating } = reviewInfo

    const navigate = useNavigate()
    const { id } = useParams()

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
            .createReview(id, { text, rating })
            .then(() => {
                navigate(`/detalles/${id}`)
                closeReview()
            })
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