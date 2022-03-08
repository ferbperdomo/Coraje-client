import { AuthContext } from "../../context/auth.context"
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container, Col, Row, Button, Modal } from "react-bootstrap"
import usersService from "../../services/users.service"
import UserCard from "../../components/UserCard/UserCard"
import PlacesCard from '../../components/PlacesCard/PlacesCard'
import FriendsCard from '../../components/FriendsCard/FriendsCard'
import EditUserForm from '../../components/EditUserForm/EditUserForm'

const UserProfilePage = () => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({})
    const [isMyFriend, setIsMyFriend] = useState(false)

    useEffect(() => {
        setIsMyFriend(false)
        loadUserInfo()
    }, [id])

    useEffect(() => {
        checkFriendship()
    }, [userDetails])

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)
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
                console.log(userDetails)
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

    return (
        <>

            <Container className="userContainer">
                <Row>
                    {
                        user?._id != id ?
                            <>
                                <UserCard userInfo={userDetails} />
                                {isMyFriend || <Button variant="primary" type="submit" value="Submit" onClick={handleAddFriend}>Agregar amigo</Button>}
                                {isMyFriend && <Button variant="danger" type="submit" value="Submit" onClick={handleRemoveFriend}>Eliminar amigo</Button>}
                            </>
                            :
                            <>
                                <UserCard userInfo={userDetails} />
                                <Link to='#' onClick={handleModalOpen}>
                                    <Button>Editar información</Button>
                                </Link>
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
                    <Modal.Title>Editar información de tu establecimiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditUserForm closeModal={handleModalClose} loadUserInfo={loadUserInfo} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserProfilePage