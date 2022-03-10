import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'
import UserMessage from './components/UserMessage/UserMessage'
import Footer from './components/Footer/Footer'


function App() {


  return (
    <>
      <Navigation />
      <main>
        <AppRoutes />
      </main>
      <UserMessage />
      <Footer />
    </>
  )
}

export default App
