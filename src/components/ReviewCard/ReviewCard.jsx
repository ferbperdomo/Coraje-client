const ReviewCard = () => {

    const { username, text, rating, date } = reviewInfo

    return (
        <article className="review">
            <Card>
                <Card.Header>{username}</Card.Header>
                <Card.Body>
                    <blockquote className="review-text">
                        <p>
                            {' '}{text}{' '}
                            {rating}
                        </p>
                        <footer className="review-date">
                            {date}
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </article>
    )
}

























