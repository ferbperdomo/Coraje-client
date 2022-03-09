import { Card, Button, Collapse } from 'react-bootstrap'
import EditReviewForm from "../../components/EditReviewForm/EditReviewForm"
import { Link } from 'react-router-dom'
import { useState } from 'react'


<<<<<<< HEAD
const ReviewCard = ({ review, loadReviews }) => {

    const [openReviewEditor, setOpenReviewEditor] = useState(false)
    const handleTransEditorClose = () => setOpenReviewEditor(false)
    const handleTransEditorOpen = () => setOpenReviewEditor(true)

=======
>>>>>>> f57205faf5e0941849bd1e9ec129f12bd71abb73
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
                <Link to='#' onClick={handleTransEditorOpen}>
                    <Button>Editar comentario</Button>
                </Link>
            </Card>
            <Collapse in={openReviewEditor}>
                <div id="example-collapse-text">
                    <EditReviewForm closeReview={handleTransEditorClose} loadReviews={loadReviews} />
                </div>
            </Collapse>
        </article>
    )
}

export default ReviewCard

























