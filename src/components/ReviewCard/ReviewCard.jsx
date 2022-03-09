import { Card, Button } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import reviewsService from '../../services/review.service'


const ReviewCard = ({ review, loadReviews, placeId }) => {

    const navigate = useNavigate()

    const deleteReview = (_id) => {
        reviewsService
            .deleteReview(review._id)
            .then(() => {
                loadReviews()
                navigate(`/detalles/${placeId}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <article className="review" >
            <Card>
                <Card.Header>{review.username?.username}</Card.Header>
                <Card.Body>
                    <blockquote className="review-text">
                        <p>
                            {' '}{review.text}{' '}
                            {review.rating}
                        </p>
                        <footer className="review-date">
                            {review.date}
                        </footer>
                    </blockquote>
                </Card.Body>
                <Link to='#' onClick={deleteReview}>
                    <Button>Eliminar comentario</Button>
                </Link>
            </Card>
        </article>
    )
}

export default ReviewCard

























