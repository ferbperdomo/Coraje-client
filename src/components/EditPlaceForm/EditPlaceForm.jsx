import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import placesService from "../../services/places.service"
import uploadService from "../../services/upload.service"
import { Row, Col, Form, Button } from 'react-bootstrap'
import Geocode from "react-geocode"
Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`)
Geocode.setLanguage("es")
Geocode.setRegion("es")
Geocode.setLocationType("ROOFTOP")

const EditPlaceForm = ({ closeModal }) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [placeInfo, setPlaceInfo] = useState({
        name: "",
        type: "",
        url: "",
        image: "",
        description: "",
        locationText: ""
    })

    const [placeGeolocation, setPlaceGeolocation] = useState({ lat: 0, lng: 0 })

    const [loadingImage, setLoadingImage] = useState(true)

    const { name, type, url, description, locationText, image } = placeInfo
    const { lat, lng } = placeGeolocation


    useEffect(() => {
        loadPlaces()
    }, [])

    useEffect(() => {
        setPlaceGeolocation({
            lat: placeInfo.location?.coordinates[0],
            lng: placeInfo.location?.coordinates[1]
        })
    }, [placeInfo])

    const loadPlaces = () => {
        placesService
            .getOnePlace(id)
            .then(({ data }) => setPlaceInfo(data))
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { name, value } = e.target

        if (name === 'locationText') {
            getUserLocation(value)
        }
        setPlaceInfo({
            ...placeInfo,
            [name]: value
        })
    }

    const uploadPlaceImage = e => {

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setPlaceInfo({ ...placeInfo, image: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }

    const getUserLocation = (val) => {
        Geocode.fromAddress(val).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location
                setPlaceGeolocation({ lat, lng })
            },
            (error) => {
                console.log(error)
            }
        )
    }

    function handleSubmit(e) {

        e.preventDefault()

        placesService
            .updateOnePlace(id, { name, type, url, description, locationText, image, lat, lng })
            .then(() => {
                navigate('/')
                closeModal()
            })
            .catch(err => console.log(err))
    }

    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de local</Form.Label>
                        <Form.Control type="text" name="type" value={type} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Url del local</Form.Label>
                        <Form.Control type="text" name="url" value={url} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="description" value={description} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control type="text" name="locationText" value={locationText} onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                            Mantendremos la ubicación anterior si no necesitas editarla
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" onChange={uploadPlaceImage} />
                        <Form.Text className="text-muted">
                            Mantendremos la imagen anterior si no necesitas editarla
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Terminar edición
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default EditPlaceForm