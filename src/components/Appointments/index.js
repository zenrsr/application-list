import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    nameInput: '',
    dateInput: '',
    appointmentList: [],
    starButton: false,
  }

  addAppointment = event => {
    event.preventDefault()
    const {nameInput, dateInput, appointmentList} = this.state

    const newApp = {
      id: v4(),
      title: nameInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newApp],
      nameInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  starToggleLike = id => {
    // const {appointmentList} = this.state
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachApp => {
        if (eachApp.id === id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  toggleStarred = () => {
    // const {appointmentList} = this.state
    this.setState(prevState => ({starButton: !prevState.starButton}))
  }

  renderAppointmentList = requiredList =>
    requiredList.map(eachAppointment => (
      <AppointmentItem
        appointmentDetails={eachAppointment}
        key={eachAppointment.id}
        starToggleLike={this.starToggleLike}
      />
    ))

  render() {
    const {nameInput, dateInput, appointmentList, starButton} = this.state
    const filteredList = appointmentList.filter(each => each.isStarred === true)

    const activeStarredButton = starButton ? 'active' : ''

    return (
      <div className="background-container">
        <div className="container">
          <div className="sub-container">
            <div className="appointment-container">
              <form className="form" onSubmit={this.addAppointment}>
                <h1 className="heading"> Add Appointment</h1>
                <label htmlFor="titleId" className="title">
                  TITLE
                </label>
                <input
                  type="text"
                  className="title-input"
                  value={nameInput}
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  id="titleId"
                />
                <label htmlFor="dateId" className="date">
                  DATE
                </label>
                <input
                  type="date"
                  className="date-input"
                  value={dateInput}
                  placeholder="dd/mm/yy"
                  onChange={this.onChangeDate}
                  id="dateId"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="line" />
          <div className="appointment-list-heading">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={` starred-button ${activeStarredButton} `}
              onClick={this.toggleStarred}
            >
              Starred
            </button>
          </div>
          <ul className="list-container" type="none">
            {starButton
              ? this.renderAppointmentList(filteredList)
              : this.renderAppointmentList(appointmentList)}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
