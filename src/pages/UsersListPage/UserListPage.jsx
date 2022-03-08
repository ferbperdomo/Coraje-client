import { useState, useEffect } from "react"
import placesService from "../../services/places.service"
import { Form, FormControl, Button, Container, Card, Row, Col } from 'react-bootstrap'
import usersService from "../../services/users.service"
import { Link, useNavigate } from "react-router-dom"

const UserListPage = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [usersSearch, setUsersSearch] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [usersSearch])

    const loadUsers = () => {
        if (!usersSearch) {
            usersService
                .getAllUsers()
                .then(({ data }) => setUsers(data))
                .catch(err => console.log(err))
        } else {
            usersService
                .getFilteredUsers(usersSearch)
                .then(({ data }) => setUsers(data))
                .catch(err => console.log(err))
        }

    }

    const handleInput = e => {
        setUsersSearch(e.target.value)
        navigate('/resultados-busqueda-usuarixs')
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <>
            <Container className="userListPage">
                <Form className="d-flex mb-3 mt-5" onSubmit={handleSubmit}>
                    <FormControl
                        type="search"
                        placeholder="Buscar amigxs"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleInput}
                    />
                </Form >

                <Row>
                    {users.map(user => {
                        return <Col>
                            <Card style={{ width: '10rem' }}>
                                <Card.Img variant="top" src={user.profileImg} />
                                <Card.Body>
                                    <Card.Title>{user.username}</Card.Title>
                                    <Card.Text>
                                        {user.description}
                                    </Card.Text>
                                    <Link to={`/perfil/${user._id}`}>
                                        <Button variant="primary">Detalles</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>
        </>

    )

}

export default UserListPage