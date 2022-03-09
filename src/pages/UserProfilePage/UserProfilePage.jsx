import { AuthContext } from "../../context/auth.context"
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container, Col, Row, Button, Modal } from "react-bootstrap"
import usersService from "../../services/users.service"
import UserCard from "../../components/UserCard/UserCard"
import PlacesCard from '../../components/PlacesCard/PlacesCard'
import FriendsCard from '../../components/FriendsCard/FriendsCard'
import EditUserForm from '../../components/EditUserForm/EditUserForm'
import CreatePlaceForm from "../../components/PlaceForm/PlaceForm"

const UserProfilePage = () => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({})
    const [isMyFriend, setIsMyFriend] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const handleRegisterModalClose = () => setShowRegisterModal(false)
    const handleRegisterModalOpen = () => setShowRegisterModal(true)

    useEffect(() => {
        setIsMyFriend(false)
        loadUserInfo()
    }, [id])

    useEffect(() => {
        checkFriendship()
    }, [userDetails])

    const { favPlaces, friends } = userDetails

    const checkFriendship = () => {
        if (friends?.some(friend => friend._id.includes(user._id))) {
            setIsMyFriend(true)
        }
    }

    const loadUserInfo = () => {
        usersService
            .getOneUser(id)
            .then(({ data }) => {
                setUserDetails(data)
            })
            .catch(err => console.log(err))
    }

    const handleAddFriend = () => {
        usersService
            .addOneFriend(id)
            .then(() => navigate(`/perfil/${user._id}`))
            .catch(err => console.log(err))
    }

    const handleRemoveFriend = () => {
        usersService
            .removeOneFriend(id)
            .then(() => navigate(`/perfil/${user._id}`))
            .catch(err => console.log(err))
    }

    const handleDeleteUser = () => {
        usersService
            .deleteUser(id)
            .then(() => navigate(`/perfil/${user._id}`))
            .catch(err => console.log(err))
    }

    return (
        <>

            <Container className="userContainer">
                <Row>
                    {
                        user?._id === id || user?.role === "ADMIN" ?
                            <>
                                <UserCard userInfo={userDetails} />
                                <Link to='#' onClick={handleModalOpen}>
                                    <Button>Editar información</Button>
                                </Link>
                                {user?.role === "ADMIN" && <Button variant="dark" type="submit" value="Submit" onClick={handleDeleteUser}>Eliminar usuario</Button>}
                                {user?.role === "OWNER" && <Button variant="success" type="submit" value="Submit" onClick={handleRegisterModalOpen}>Añadir local</Button>}

                            </>
                            :
                            <>
                                <UserCard userInfo={userDetails} />
                                {isMyFriend || <Button variant="primary" type="submit" value="Submit" onClick={handleAddFriend}>Agregar amigo</Button>}
                                {isMyFriend && <Button variant="danger" type="submit" value="Submit" onClick={handleRemoveFriend}>Eliminar amigo</Button>}
                            </>
                    }
                </Row>

                <Row>
                    <h1>Lugares fav</h1>
                    {favPlaces?.map(place => {
                        return <Col md={6} key={place._id}> <PlacesCard favPlace={place} /> </Col>
                    })
                    }
                </Row>

                <Row>
                    <h1>Amigxs</h1>
                    {friends?.map(friend => {
                        return <Col md={6} key={friend._id}> <FriendsCard friend={friend} /> </Col>
                    })
                    }
                </Row>

            </Container>

            <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar información</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditUserForm closeModal={handleModalClose} loadUserInfo={loadUserInfo} />
                </Modal.Body>
            </Modal>
            <Modal show={showRegisterModal} onHide={handleRegisterModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Registrar local</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePlaceForm closeModal={handleRegisterModalClose} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserProfilePage