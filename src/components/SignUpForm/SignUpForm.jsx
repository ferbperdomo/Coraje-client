import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Form, Button, Row, Col, ToggleButton } from 'react-bootstrap'
import authService from "../../services/auth.service"
import uploadService from "../../services/upload.service"

function SignUpForm({ closeModal }) {

    const [signupForm, setSignupForm] = useState({
        username: "",
        password: "",
        email: "",
        profileImg: "",
        description: ""
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [owner, setOwner] = useState({ role: "", isOwner: false })

    const { username, password, email, description } = signupForm
    const { role, isOwner } = owner

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignupForm({ ...signupForm, [name]: value })
    }

    const handleCheckbox = e => {
        const { name, checked } = e.target

        if (checked) {
            setOwner({ role: "OWNER", [name]: true })
        }
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
            .signup({ ...signupForm, role })
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
                        <Form.Label>Nombre de usuarix</Form.Label>
                        <Form.Control type="text" name="username" value={username} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dirección de email</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                            No te preocupes, nunca guardamos tu contraseña en nuestra base de datos :)
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="description" value={description} onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                            Es completamente opcional, pero nos gustaría saber más de ti!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Subir imagen de perfil</Form.Label>
                        <Form.Control type="file" name="profileImg" onChange={uploadProfileImage} />
                    </Form.Group>

                    <ToggleButton
                        id="checkbox"
                        type="checkbox"
                        variant={isOwner ? 'outline-success' : 'outline-danger'}
                        className="mb-3"
                        name="isOwner"
                        checked={isOwner}
                        onChange={handleCheckbox}
                    >
                        ¿Eres dueñx de un local?
                    </ToggleButton>


                    <div className="d-grid gap-2">
                        <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Completar registro'}</Button>
                    </div>
                </Form>
            </Col>
        </Row>

    )
}

export default SignUpForm
