import { useParams } from "react-router-dom"
import placesService from "../../services/places.service"
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../context/auth.context"
import EditPlaceForm from "../../components/EditPlaceForm/EditPlaceForm"
import { Button, Modal, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import usersService from "../../services/users.service"


const PlaceDetailsPage = () => {

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()

    const [placeDetails, setPlaceDetails] = useState({})
    const { name, type, description, image, location, url, owner } = placeDetails
    useEffect(() => {
        placesService
            .getOnePlace(id)
            .then(({ data }) => setPlaceDetails(data))
            .catch(err => console.log(err))
    }, [])

    const handleAddFavPlace = () => {
        usersService
            .addOnePlace(id)
            .then(() => navigate(`/perfil/${user._id}`))
            .catch(err => console.log(err))
    }
    const handleDeleteFavPlace = () => {
        placesService
            .deleteOnePlace(id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Container>
                <Row>

                    {
                        user?._id === owner || user?.role === "ADMIN" ?
                            <>
                                <article className="placeDetails">

                                    <img className="placeimg" src={image} />
                                    <hr />
                                    <Link to={`/perfil/${user?._id}`}>Volver</Link>
                                    <h1>{name}</h1>
                                    <p>{type}</p>
                                    <p>{description}</p>
                                    <a href={url}>Página web</a>

                                </article>
                                <Link to='#' onClick={handleModalOpen}>
                                    <Button>Editar información</Button>
                                </Link>
                                <Button variant="danger" type="submit" value="Submit" onClick={handleDeleteFavPlace}>Eliminar lugar</Button>

                            </>
                            :
                            <>
                                <article className="placeDetails">

                                    <img className="placeimg" src={image} />
                                    <hr />
                                    <Link to={`/perfil/${user?._id}`}>Volver</Link>
                                    <h1>{name}</h1>
                                    <p>{type}</p>
                                    <p>{description}</p>
                                    <a href={url}>Página web</a>

                                </article>

                                <Button variant="primary" type="submit" value="Submit" onClick={handleAddFavPlace}>Agregar lugar a favoritos</Button>
                            </>
                    }

                </Row>

            </Container>

            <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar información de tu establecimiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditPlaceForm closeModal={handleModalClose} />
                </Modal.Body>
            </Modal>

        </>

    )
}

export default PlaceDetailsPage