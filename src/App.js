import './App.css';
import Header from './components/Header/Header'
import GameContainer from './components/GameContainer/GameContainer'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className="App">
      <Header />
      <GameContainer />
      <Footer />
    </div>
  );
}

export default App;