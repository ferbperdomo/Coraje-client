import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'
import UserMessage from './components/UserMessage/UserMessage'


function App() {


  return (
    <>
      <Navigation />
      <AppRoutes />
      <UserMessage />
    </>
  )
}

export default App
