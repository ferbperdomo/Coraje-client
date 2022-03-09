import { useParams } from "react-router-dom"
import placesService from "../../services/places.service"
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../context/auth.context"
import EditPlaceForm from "../../components/EditPlaceForm/EditPlaceForm"
import { Button, Modal, Collapse, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import usersService from "../../services/users.service"
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import reviewsService from "../../services/review.service"
import ReviewCard from '../../components/ReviewCard/ReviewCard'


const PlaceDetailsPage = () => {

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    const [openReview, setOpenReview] = useState(false)
    const handleTransClose = () => setOpenReview(false)
    const handleTransOpen = () => setOpenReview(true)

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()

    const [placeDetails, setPlaceDetails] = useState({})
    const [reviews, setReviews] = useState([])

    const { name, type, description, image, location, url, owner } = placeDetails
    useEffect(() => {
        loadPlace()
        loadReviews()
    }, [])

    const loadPlace = () => {
        placesService
            .getOnePlace(id)
            .then(({ data }) => setPlaceDetails(data))
            .catch(err => console.log(err))
    }

    const loadReviews = () => {
        reviewsService
            .getAllReviews(id)
            .then(({ data }) => setReviews(data))
            .catch(err => console.log(err))
    }

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

                    <article className="placeDetails">

                        <img className="placeimg" src={image} />
                        <hr />
                        <Link to={`/perfil/${user?._id}`}>Volver</Link>
                        <h1>{name}</h1>
                        <p>{type}</p>
                        <p>{description}</p>
                        <a href={url}>Página web</a>

                    </article>
                    {
                        user?._id === owner || user?.role === "ADMIN" ?
                            <>
                                <Link to='#' onClick={handleModalOpen}>
                                    <Button>Editar información</Button>
                                </Link>
                                <Button variant="danger" type="submit" value="Submit" onClick={handleDeleteFavPlace}>Eliminar lugar</Button>

                            </>
                            :
                            <>

                                <Button variant="primary" type="submit" value="Submit" onClick={handleAddFavPlace}>Agregar lugar a favoritos</Button>


                                <Button onClick={handleTransOpen} > Añadir opinión </Button>

                                <Collapse in={openReview}>
                                    <div id="example-collapse-text">
                                        <ReviewForm closeReview={handleTransClose} loadReviews={loadReviews} />
                                    </div>
                                </Collapse>
                                {
                                    reviews.map(review => <ReviewCard review={review} key={review._id} loadReviews={loadReviews} />)
                                }
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