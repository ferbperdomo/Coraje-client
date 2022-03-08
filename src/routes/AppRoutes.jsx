import { Routes, Route } from 'react-router-dom'
import IndexPage from './../pages/IndexPage/IndexPage'
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage'
import PlaceFormPage from '../pages/PlaceFormPage/PlaceFormPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import PlaceDetailsPage from '../pages/PlaceDetailsPage/PlaceDetailsPage'
import PrivateRoute from './PrivateRoutes'
import UserListPage from '../pages/UsersListPage/UserListPage'


const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/crear-local' element={<PlaceFormPage />} />
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