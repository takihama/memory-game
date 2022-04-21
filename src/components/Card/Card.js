import './Card.css'

const Card = ({ isFlipped, clickHandler, color }) => {
  return (
    <div className='card' onClick={clickHandler}>
      <div className={'card-inner' + (isFlipped ? ' flipped' : '')}>
        <div className='card-back'>
        </div>
        <div className='card-front' style={{background: color}}>
        </div>
      </div>
    </div>
  )
}

export default Card