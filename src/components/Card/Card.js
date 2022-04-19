import './Card.css'

const Card = ({ text, isFlipped, clickHandler, color }) => {
  return (
    <div className='card' onClick={clickHandler}>
      <div className={'card-inner' + (isFlipped ? ' flipped' : '')}>
        <div className='card-back'>
          <h1>Logo</h1>
        </div>
        <div className='card-front' style={{background: color}}>
          <h1>{text}</h1>
        </div>
      </div>
    </div>
  )
}

export default Card