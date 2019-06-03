// react stuff
import React, { Component } from 'react'
// redux stuff
import { connect } from 'react-redux'
import dashboardActions from 'reduxConfig/actions/dashboard'
// components
import AttendeeCircle from 'components/dashboard/dashboard-event-detail/attendee-circle/'
import DashBoardEventDetailForm from 'components/dashboard/dashboard-event-detail/dashboard-event-detail-form/'

class DashboardEventDetail extends Component {
    constructor(props) {
        super(props)
        this.buildAttendeesContent = this.buildAttendeesContent.bind(this)
    }

    componentDidMount() {
        const { match: { params: { id } }, fetchEvents } = this.props
        fetchEvents(id)
    }

    buildAttendeesContent() {
        const { events: { eventList: eventDetail } } = this.props

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

    buildContent() {
        const { events: { eventList: eventDetail } } = this.props
        const attendees = this.buildAttendeesContent()

        return <DashBoardEventDetailForm attendees={attendees} eventDetail={eventDetail} />
    }

    render() {
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
        fetchEvents: dashboardActions.fetchEvents
    }
)(DashboardEventDetail)
