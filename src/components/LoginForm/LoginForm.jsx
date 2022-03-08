import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../../services/auth.service"
import { AuthContext } from "./../../context/auth.context"
import { Button, Row, Col, Form } from 'react-bootstrap'

function LoginForm({ closeModal }) {

    const [loginForm, setLoginForm] = useState({
        password: "",
        email: ""
    })

    const navigate = useNavigate()

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
                navigate('/')
                closeModal()
            })
            .catch(err => console.log(err))
    }

    return (
        <Row className="justify-content-md-center">
            <Col md={6}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={loginForm.email} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={loginForm.password} onChange={handleInputChange} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="dark" type="submit">Iniciar sesión</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default LoginForm