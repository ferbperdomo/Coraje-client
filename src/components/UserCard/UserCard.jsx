import { Card } from 'react-bootstrap'

const UserCard = ({ userInfo }) => {
    const { username, description, role, profileImg } = userInfo

    return (
        <Card >
            <h1>Perfil de {username} </h1>
            <Card.Img className='userImg' variant="top" src={profileImg} />
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>{role}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default UserCard