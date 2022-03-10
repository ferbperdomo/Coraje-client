import { Card } from 'react-bootstrap'
import './UserCard.css'

const UserCard = ({ userInfo }) => {

    const { username, description, role, profileImg } = userInfo

    return (
        <div className='user-card'>
            <Card className='user-card-content'>
                <Card.Img className='userImg' variant="top" src={profileImg} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>{role}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard