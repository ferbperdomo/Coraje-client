import { Routes, Route } from 'react-router-dom'
import IndexPage from './../pages/IndexPage/IndexPage'
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import PlaceDetailsPage from '../pages/PlaceDetailsPage/PlaceDetailsPage'
import PrivateRoute from './PrivateRoutes'
import UserListPage from '../pages/UsersListPage/UserListPage'
import HomePage from '../pages/HomePage/HomePage'


const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/buscador' element={<IndexPage />} />
            <Route path='/detalles/:id' element={<PlaceDetailsPage />} />
            <Route path="/perfil/:id" element={<PrivateRoute />}>
                <Route path='' element={<UserProfilePage />} />
            </Route>

            <Route path='/resultados-busqueda-usuarixs' element={<UserListPage />} />

            <Route path='*' element={< NotFoundPage />} />
        </Routes >
    )
}

export default AppRoutes