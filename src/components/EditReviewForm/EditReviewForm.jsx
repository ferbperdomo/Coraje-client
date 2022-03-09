import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import reviewsService from "../../services/review.service"
import { Form, Button } from 'react-bootstrap'

const EditReviewForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [reviewInfo, setReviewInfo] = useState({
        text: "",
        rating: "",
    })

    const { text, rating } = reviewInfo

    useEffect(() => {
        loadReview()
    }, [])

    const loadReview = () => {
        reviewsService
            .getOneReview(id)
            .then(data => setReviewInfo(data))
    }

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
            .updateReview(id, { text, rating })
            .then(() => {
                loadReview()
                navigate(`/`)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Añade aquí tus nuevas valoraciones</Form.Label>
                    <Form.Control as="textarea" name="text" value={text} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Añade una nueva puntuación</Form.Label>
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
                    Completar edición
                </Button>
            </Form>
        </>
    )
}

export default EditReviewForm