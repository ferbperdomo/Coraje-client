import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <Container className="homeContainer">

            <h1 className="mainTitle">Coraje</h1>
            <div className="logoContainer">
                <img className="homeLogo" src="https://res.cloudinary.com/ferbperdomo/image/upload/v1646905964/Coraje/coraje-logo_zxskff.png" alt="coraje el perro cobarde" />
            </div>
            <p className="slogan">Tu web segura</p>

            <section id="introduction">
                <article>

                    <h2>¿Alguna vez te has sentido insegurx en un lugar por ser tal como eres?</h2>
                    <div className="slogan">
                        <p>Este lugar es para ti.</p>
                        <p>¡Bienvenidx!</p>
                    </div>

                </article>
            </section>

            <section id="justification">
                <article>
                    <p>Ante la violencia persistente que viven diariamente muchas personas de la  comunidad LGBTQ+, este proyecto nace ante la necesidad de brindar un espacio para buscar y/o registrar lugares seguros y amigables para nuestrxs miembrxs.</p>
                    <img className="coraje" src="https://res.cloudinary.com/ferbperdomo/image/upload/v1646904504/Coraje/coraje_trans_l_e2yfae.png" alt="coraje el perro cobarde" />
                </article>
            </section>

            <Link to='/buscador'>
                <Button className="placesButton mb-5">Ver los sitios</Button>
            </Link>

        </Container>
    )
}
export default HomePage