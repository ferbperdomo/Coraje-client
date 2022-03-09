import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import usersService from "../../services/users.service"
import { Row, Col, Form, Button } from 'react-bootstrap'
import uploadService from "../../services/upload.service"


const EditUserForm = ({ closeModal, loadUserInfo }) => {

    const { id } = useParams()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        console.log('Entrando')
        usersService
            .getOneUser(id)
            .then(({ data }) => {
                setUserInfo(data)
            })
            .catch(err => console.log(err))
    }

    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        profileImg: "",
        description: ""
    })
    const { username, email, profileImg, description } = userInfo

    const [loadingImage, setLoadingimage] = useState(true)


    const handleInputChange = e => {
        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const uploadProfileImage = e => {

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setUserInfo({ ...userInfo, profileImg: data.cloudinary_url })
                setLoadingimage(false)

            })
            .catch(err => console.log(err))
    }

    function handleSubmit(e) {

        e.preventDefault()

        usersService
            .updateOneUser(id, { username, email, profileImg, description })
            .then(({ data }) => {
                loadUserInfo()
                console.log(data)
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

                    {/* <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={handlePasswordChange} />
                    </Form.Group> */}

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="description" value={description} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Subir imagen de perfil</Form.Label>
                        <Form.Control type="file" name="profileImg" onChange={uploadProfileImage} />
                        <Form.Text className="text-muted">
                            Si no subes una imagen nueva, se mantendrá la anterior.
                        </Form.Text>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="dark" type="submit">Completar edición</Button>
                    </div>
                </Form>
            </Col>
        </Row>

    )
}

export default EditUserForm