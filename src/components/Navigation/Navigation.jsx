import './Navigation.css'
import { Navbar, Container, Nav, Modal, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'

const Navigation = () => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    const [showLoginModal, setShowLoginModal] = useState(false)
    const handleLoginModalClose = () => setShowLoginModal(false)
    const handleLoginModalOpen = () => setShowLoginModal(true)

    const [showSignupModal, setShowSignupModal] = useState(false)
    const handleSignupModalClose = () => setShowSignupModal(false)
    const handleSignupModalOpen = () => setShowSignupModal(true)

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className='d-flex mb-5' >
                <Container>
                    <Col>
                        <NavLink to="/">
                            <img className='logo' src='https://res.cloudinary.com/ferbperdomo/image/upload/v1646905964/Coraje/coraje-logo_zxskff.png' alt='logo de Coraje' />
                            <Navbar.Brand as="span">Coraje</Navbar.Brand>
                        </NavLink>
                    </Col>
                    <Col className=' d-flex me-auto justify-content-end'>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </Col>
                    <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
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
                                            <Nav.Link as="span">Mi perfil</Nav.Link>
                                        </NavLink>
                                        <NavLink to='/resultados-busqueda-usuarixs'>
                                            <Nav.Link as="span">Buscar amigxs</Nav.Link>
                                        </NavLink>
                                        <NavLink to="#">
                                            <Nav.Link as="span" onClick={logOutUser}>Cerrar sesión</Nav.Link>
                                        </NavLink>
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

        </>

    )
}

export default Navigation