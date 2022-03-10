import '../IndexPage/IndexPage.css'
import { Container, Form, FormControl } from "react-bootstrap"
import { LoadMap } from '../../components/Map/LoadMap'
import placesService from '../../services/places.service'
import { useEffect, useState } from "react"
import Spinner from '../../components/Spinner/Spinner'

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
            <>
                {
                    loading
                        ? <Spinner />

                        : <>
                            <Form className="d-flex mb-3 mt-5" onSubmit={handleSubmit}>
                                <FormControl
                                    id="map-search"
                                    type="search"
                                    placeholder="¿A qué lugar te gustaría ir?"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleInput}
                                />
                            </Form>
                            {
                                placesSearch
                                    ?
                                    <LoadMap places={places} placeSearched={placesSearch} />
                                    :
                                    <>
                                        <h1>hola</h1>
                                    </>
                            }
                        </>
                }
            </>
        </Container>

    )
}

export default IndexPage