import '../IndexPage/IndexPage.css'
import { Container, Form, FormControl } from "react-bootstrap"
import { LoadMap } from '../../components/Map/LoadMap'
import placesService from '../../services/places.service'
import { useEffect, useState } from "react"
import Spinner from '../../components/Spinner/Spinner'
import BouncingArrow from "../../components/BouncingArrow/BoucingArrow"
import './IndexPage.css'

const IndexPage = () => {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [placesSearch, setPlacesSearch] = useState('')

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
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <Container>
            <p className="visit">Visita nuestra colección de lugares en los que te sentirás segurx.</p>
            {!placesSearch && <BouncingArrow />}
            {
                loading
                    ? <Spinner />
                    : <>
                        <Form className="searchBar d-flex mb-3 mt-5" onSubmit={handleSubmit}>
                            <FormControl
                                id="map-search"
                                type="search"
                                placeholder="¿A qué lugar te gustaría ir?"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleInput}
                            />
                        </Form>
                        {placesSearch && <LoadMap places={places} placeSearched={placesSearch} />}
                    </>
            }
        </Container>
    )
}

export default IndexPage