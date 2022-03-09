import { Card } from 'react-bootstrap'

const ReviewCard = ({ review }) => {

    return (
        <article className="review">
            <Card>
                <Card.Header>{review.username}</Card.Header>
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
            </Card>
        </article>
    )
}

export default ReviewCard

























