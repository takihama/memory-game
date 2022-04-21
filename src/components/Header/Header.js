import './Header.css'

const Header = () => {
  return (
    <div className='header-outer'>
      <div className='header-inner'>
        <button className='settings'>Settings</button>
        <button className='changeGame'>Change Game</button>
      </div>
    </div>
  )
}

export default Header