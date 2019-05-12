// react stuff
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// redux stuff
import { connect } from 'react-redux'
import dashboardActions from 'reduxConfig/actions/dashboard'
// material ui
import Grid from '@material-ui/core/Grid'
// components
import DashboardEvent from 'components/dashboard/dashboard.event/dashboard.event'
import CustomCircle from 'components/custom.circle/custom.circle'
import ProfileIcon from 'components/ProfileIcon/ProfileIcon'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goToCreateEventPage: false
    }
    this.buildEvents = this.buildEvents.bind(this)
    this.onClickAddEventIcon = this.onClickAddEventIcon.bind(this)
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  onClickAddEventIcon () {
    this.setState({goToCreateEventPage: true})
  }

  buildEvents () {
    const {events: {eventList}} = this.props
    if (eventList.length) {
      return eventList.map((event, index) => {
        return (
          <DashboardEvent
            history={this.props.history}
            key={index} eventInfo={event}
            redirect
            />
        )
      })
    } else {
      return []
    }
  }

  buildDashboardContent () {
    // check if we need to go to create new event page
    if (this.state.goToCreateEventPage) {
      return <Redirect to={{pathname: `/event-new`}} />
    }
    // otherwise build the events view
    const events = this.buildEvents()
    return (
      <Grid container className='dashboard' spacing={24}>
        <Grid item md={12} sm={12} xs={12}>
          <div className='dashboard__container'>

            <div className='dashboard__top-bar'>
              <ProfileIcon />
            </div>

            <div className='dashboard__menu'>
              <ul className='dashboard__menu-list'>
                <li> ALL EVENTS</li>
                <li> FUTURE EVENTS</li>
                <li> PAST EVENTS</li>
              </ul>
              <div className='dashboard__menu-icons'>
                <div>icon1</div>
                <div>icon2</div>
              </div>
            </div>

            <div className='dashboard__events'>
              {events}
            </div>

            <div className='dashboard__events-footer'>
              <CustomCircle onClickIcon={this.onClickAddEventIcon} />
            </div>

          </div>
        </Grid>
      </Grid>
    )
  }

  render () {
    return this.buildDashboardContent()
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
)(Dashboard)
