import './index.css'

const AppointmentItem = props => {
  const {starToggleLike, appointmentDetails} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const toggleLike = () => {
    starToggleLike(id)
  }

  return (
    <li className="list-item">
      <div className="appointment-info">
        <p className="item-title">{title}</p>
        <p className="item-date">Date: {date}</p>
      </div>
      <button
        type="button"
        className="star-button"
        data-testid="star"
        onClick={toggleLike}
      >
        <img src={starImage} alt="star" className="star-image" />
      </button>
    </li>
  )
}
export default AppointmentItem
