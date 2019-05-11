// react stuff
import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
// redux stuff
import { connect } from 'react-redux'
import dashboardActions from 'reduxConfig/actions/dashboard'
import loginActions from 'reduxConfig/actions/login'
// components
import AttendeeCircle from 'components/dashboard/dashboard.event.deail/attendee.circle/attendee.circle'
import DashBoardEventEditForm from 'components/dashboard/dashboard.event.edit/dashboard.event.edit.form/dashboard.event.edit.form'

class DashboardEventEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      capacity: '',
      id: ''
    }

    this.buildAttendeesContent = this.buildAttendeesContent.bind(this)
    this.buildContent = this.buildContent.bind(this)
    this.onClickSaveIcon = this.onClickSaveIcon.bind(this)
  }

  componentDidMount () {
    const { match: {params: {id}}, fetchEvents } = this.props
    fetchEvents(id)
  }

  buildAttendeesContent () {
    const { events: {eventList: eventDetail} } = this.props
    if (eventDetail && eventDetail.attendees && eventDetail.attendees.length) {
      return eventDetail.attendees.map((attendee, index) => {
        return (
          <div key={index} className='dashboard-event-detail__attendees-item'>
            <AttendeeCircle labelText={`${attendee.firstName} ${attendee.lastName}`} />
          </div>
        )
      })
    } else {
      return null
    }
  }

  parseDateAndTimeInfo (eventDetail) {
    if (eventDetail && eventDetail.startsAt) {
      let dateObj = new Date(eventDetail.startsAt)
      let dateText = dateObj.toString()
      let dateTextAsArray = dateText.split(' ')
      let finalDate = `${dateTextAsArray[1]} ${dateTextAsArray[2]}, ${dateTextAsArray[3]}`
      let finalTime = `${dateTextAsArray[4]}`
      return { date: finalDate, time: finalTime }
    } else {
      return { date: '', time: '' }
    }
  }

  getEventInfoReady () {
    const { events: { eventList: eventInfo } } = this.props

    // check if we have eventInfo
    const dateAndTime = this.parseDateAndTimeInfo(eventInfo)
    return {
      date: dateAndTime['date'],
      time: dateAndTime['time'],
      title: eventInfo.title ? eventInfo.title : '',
      description: eventInfo.description ? eventInfo.description : '',
      capacity: eventInfo.capacity ? eventInfo.capacity : '',
      id: eventInfo['_id'] ? eventInfo['_id'] : ''
    }
  }

  onClickSaveIcon (eventInfo) {
    let startsAt = new Date(`${eventInfo.date} ${eventInfo.time}`)

    if (startsAt.toString() === 'Invalid Date') {
      const { events: { eventList: oldEventInfo } } = this.props
      startsAt = oldEventInfo.startsAt
    }
    // launch the request to update the event
    const infoToSent = {
      title: eventInfo.title,
      description: eventInfo.description,
      capacity: eventInfo.capacity,
      startsAt: startsAt
    }
    this.props.editEvent(infoToSent)
  }

  buildContent () {
    const { events: { tokenExpired }, loginFailure } = this.props
    // redirect to login page if the token has expired
    if (tokenExpired) {
      // dispatch this to show up the error in login page
      loginFailure('The session has expired, please login')
      return <Redirect to={{pathname: `/login`}} />
    }

    const attendees = this.buildAttendeesContent()
    const defaultEventInfo = this.getEventInfoReady()
    return (
      <DashBoardEventEditForm
        onClickSaveIcon={this.onClickSaveIcon}
        defaultEventInfo={defaultEventInfo}
        attendees={attendees}
      />
    )
  }

  render () {
    return this.buildContent()
  }
}

// bind component to the store
export default connect(
  // map props
  state => ({
    events: state.events
  }),
  // map actions
  {
    editEvent: dashboardActions.editEvent,
    fetchEvents: dashboardActions.fetchEvents,
    loginFailure: loginActions.loginFailure
  }
)(DashboardEventEdit)
