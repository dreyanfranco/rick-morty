import './App.css'
import logo from './assets/Rick_and_Morty.png'
import Characters from './components/Characters'

function App() {

  return (
    <main className='main-container'>
      <img src={logo} alt="logo" className='logo' />
      <Characters />
    </main>
  )
}

export default App
