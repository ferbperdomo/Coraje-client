import '../PlacesCard/PlacesCard.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PlacesCard = ({ favPlace }) => {

    const { name, type, image } = favPlace

    return (
        <div className='favplace-card'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title> {name}</Card.Title>
                    <Card.Text>{type}</Card.Text>
                    <Link to={`/detalles/${favPlace?._id}`}>
                        <Button variant="primary">Detalles</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div >
    )
}

export default PlacesCard