import '../FriendsCard/FriendsCard.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const FriendsCard = ({ friend }) => {
    const { username, profileImg, _id } = friend

    return (
        <div className='friend-card'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={profileImg} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                    <Link to={`/perfil/${_id}`}>
                        <Button variant="primary">Detalles</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default FriendsCard