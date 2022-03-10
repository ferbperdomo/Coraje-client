import '../NotFoundPage/NotFoundPage.css'
import { Row, Col } from 'react-bootstrap'

const NotFoundPage = () => {

    return (
        <Row className='notfound-page'>
            <Col>
                <img src="showicon_courage.webp" />
            </Col>
            <Col>
                <h3>Lo siento, no hemos encontrado esta página</h3>
            </Col>
        </Row>
    )
}

export default NotFoundPage