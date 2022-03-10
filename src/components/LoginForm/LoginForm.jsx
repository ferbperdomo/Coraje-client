import { useState, useContext } from "react"
import authService from "../../services/auth.service"
import { AuthContext } from "./../../context/auth.context"
import { MessageContext } from './../../context/userMessage.context'
import { Button, Row, Col, Form } from 'react-bootstrap'

function LoginForm({ closeModal }) {

    const [loginForm, setLoginForm] = useState({
        password: "",
        email: ""
    })

    const { setShowMessage, setMessageInfo } = useContext(MessageContext)

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({ ...loginForm, [name]: value })
    }

    function handleSubmit(e) {

        e.preventDefault()

        authService
            .login(loginForm)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                setShowMessage(true)
                setMessageInfo({ title: 'Éxito', body: 'Sesión iniciada correctamente' })
                closeModal()
            })
            .catch(err => {
                console.log(err.response)
                setShowMessage(true)
                setMessageInfo({ title: 'Atención', body: err.response.data.message })
            })
    }

    return (
        <Row className="justify-content-md-center">
            <Col md={6}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={loginForm.email} onChange={handleInputChange} className="form-input" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={loginForm.password} onChange={handleInputChange} className="form-input" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="dark" className="form-button" type="submit">Iniciar sesión</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default LoginForm