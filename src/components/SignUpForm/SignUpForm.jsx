import '../SignUpForm/SignUpForm.css'
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { Form, Button, Row, Col, } from 'react-bootstrap'
import authService from "../../services/auth.service"
import uploadService from "../../services/upload.service"
import { MessageContext } from './../../context/userMessage.context'

function SignUpForm({ closeModal }) {

    const [signupForm, setSignupForm] = useState({
        username: "",
        password: "",
        email: "",
        profileImg: "",
        description: "",
        role: ""
    })

    const { setShowMessage, setMessageInfo } = useContext(MessageContext)
    const [loadingImage, setLoadingImage] = useState(false)

    const { username, password, email, description, role } = signupForm

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignupForm({ ...signupForm, [name]: value })
    }

    const uploadProfileImage = e => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setSignupForm({ ...signupForm, profileImg: data.cloudinary_url })

            })
            .catch(err => console.log(err))
    }

    function handleSubmit(e) {

        e.preventDefault()

        authService
            .signup({ ...signupForm })
            .then(() => {
                setShowMessage(true)
                setMessageInfo({ title: 'Atención', body: "Cuenta creada con éxito. Ahora inicia sesión" })
                navigate('/')
                closeModal()
            })
            .catch(err => {
                console.log(err.response)
                setShowMessage(true)
                setMessageInfo({ title: 'Atención', body: err.response.data.message })
            })
    }

    return (
        <Row className="justify-content-md-center modal-signup">
            <Col md="auto">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de usuarix</Form.Label>
                        <Form.Control type="text" name="username" value={username} onChange={handleInputChange} className="form-input" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dirección de email</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={handleInputChange} className="form-input" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={handleInputChange} className="form-input" />
                        <Form.Text className="text-muted">
                            No te preocupes, nunca guardamos tu contraseña en nuestra base de datos :)
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="description" value={description} onChange={handleInputChange} className="form-input" />
                        <Form.Text className="text-muted">
                            Es completamente opcional, pero nos gustaría saber más de ti!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Subir imagen de perfil</Form.Label>
                        <Form.Control type="file" name="profileImg" onChange={uploadProfileImage} className="form-input" />
                    </Form.Group>

                    <Form.Select type="text" name="role"
                        vale={role} onChange={handleInputChange}
                        className="mb-3 form-input">
                        <option className="form-input" >¿Eres usuarix o propietarix de establecimiento?</option>
                        <option className="form-input" value="USER">Usuarix</option>
                        <option className="form-input" value="OWNER">Propietarix</option>
                    </Form.Select>

                    <div className="d-grid gap-2">
                        <Button type="submit" className="form-button" disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Completar registro'}</Button>
                    </div>
                </Form>
            </Col >
        </Row >

    )
}

export default SignUpForm
