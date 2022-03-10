import { useState, useEffect } from "react"
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import usersService from "../../services/users.service"
import { Link, useNavigate } from "react-router-dom"
import '../UsersListPage/UserList.css'

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
                        id="user-search"
                        type="search"
                        placeholder="Buscar amigxs"
                        aria-label="Search"
                        onChange={handleInput}
                    />
                </Form >

                {users.map(user => {
                    return <Row className="container-card" id="user-card" key={user._id}>
                        <Col xs={4} >
                            <img src={user.profileImg} alt="Foto de perfil" />
                        </Col>
                        <Col xs={6} className="card-text">
                            <h3>{user.username}</h3>
                            <p>{user.description}</p>
                        </Col>
                        <Col xs={2}>
                            <Link to={`/perfil/${user._id}`}>Ir al perfil</Link>
                        </Col>
                    </Row>
                })}
            </Container>
        </>
    )
}

export default UserListPage