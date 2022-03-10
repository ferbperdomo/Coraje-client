import { Container, Form, Button, FormControl } from "react-bootstrap"
import { LoadMap } from '../../components/Map/LoadMap'
import placesService from '../../services/places.service'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const IndexPage = () => {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [placesSearch, setPlacesSearch] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        loadPlaces()
    }, [placesSearch])

    const loadPlaces = () => {
        placesService
            .getAllPlaces()
            .then(({ data }) => {
                setPlaces(data)
                setLoading(false)
            })
            .catch(err => console.log(err))

    }

    const handleInput = e => {
        setPlacesSearch(e.target.value)
        navigate('/')
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <Container>
            <>
                {
                    loading
                        ? <h1>Cargando</h1>
                        : <>
                            <Form className="d-flex mb-3 mt-5" onSubmit={handleSubmit}>
                                <FormControl
                                    type="search"
                                    placeholder="¿A qué lugar te gustaría ir?"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleInput}
                                />
                            </Form>

                            <hr />
                            <LoadMap places={places} placeSearched={placesSearch} />
                        </>
                }
            </>
        </Container>

    )
}

export default IndexPage