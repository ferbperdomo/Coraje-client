import { Navbar, Container, Nav, Modal, Form, FormControl, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import CreatePlaceForm from '../PlaceForm/PlaceForm'

const Navigation = () => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    const [showLoginModal, setShowLoginModal] = useState(false)
    const handleLoginModalClose = () => setShowLoginModal(false)
    const handleLoginModalOpen = () => setShowLoginModal(true)

    const [showSignupModal, setShowSignupModal] = useState(false)                 // esto se tiene que poder refactorizar
    const handleSignupModalClose = () => setShowSignupModal(false)                // el problema es qué poner en el Modal.Body
    const handleSignupModalOpen = () => setShowSignupModal(true)

    const [showRegisterModal, setShowRegisterModal] = useState(false)                 // esto se tiene que poder refactorizar
    const handleRegisterModalClose = () => setShowRegisterModal(false)                // el problema es qué poner en el Modal.Body
    const handleRegisterModalOpen = () => setShowRegisterModal(true)


    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <NavLink to="/">
                        <Navbar.Brand as="span">MariconApp</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            {
                                !isLoggedIn ?
                                    <>
                                        <NavLink to='#'>
                                            <Nav.Link as="span" onClick={handleSignupModalOpen}>Registrarme</Nav.Link>
                                        </NavLink>
                                        <NavLink to='#'>
                                            <Nav.Link as="span" onClick={handleLoginModalOpen}>Iniciar sesión</Nav.Link>
                                        </NavLink>
                                    </>
                                    :
                                    <>
                                        <NavLink to={`/perfil/${user?._id}`}>
                                            {/* <Nav.Link as="span">Perfil de {user?.username}</Nav.Link> */}
                                            <Nav.Link as="span">Mi perfil</Nav.Link>
                                        </NavLink>
                                        {/* <NavLink to='/crear-local'>
                                            <Nav.Link as="span">Registrar local</Nav.Link>
                                        </NavLink> */}
                                        <NavLink to='#'>
                                            <Nav.Link as="span" onClick={handleRegisterModalOpen}>Registrar local</Nav.Link>
                                        </NavLink>
                                        <NavLink to='/resultados-busqueda-usuarixs'>
                                            <Nav.Link as="span">Buscar amigxs</Nav.Link>
                                        </NavLink>
                                        {/* <NavLink to='/resultados-busqueda-usuarixs'>
                                            <Nav.Link as="span">Cambiar contraseña</Nav.Link>
                                        </NavLink> */}

                                        <Nav.Link as="span" onClick={logOutUser}>Cerrar sesión</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showSignupModal} onHide={handleSignupModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignUpForm closeModal={handleSignupModalClose} />
                </Modal.Body>
            </Modal>

            <Modal show={showLoginModal} onHide={handleLoginModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm closeModal={handleLoginModalClose} />
                </Modal.Body>
            </Modal>

            <Modal show={showRegisterModal} onHide={handleRegisterModalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Registrar local</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePlaceForm closeModal={handleRegisterModalClose} />
                </Modal.Body>
            </Modal>
        </>

    )
}

export default Navigation