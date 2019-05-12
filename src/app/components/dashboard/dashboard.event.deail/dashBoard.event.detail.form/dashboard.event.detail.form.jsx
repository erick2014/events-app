// react stuff
import React from 'react'
import { Link } from 'react-router-dom'
// material ui
import Grid from '@material-ui/core/Grid'
import {ArrowBack} from '@material-ui/icons'

// components
import ProfileIcon from 'components/ProfileIcon/ProfileIcon'
import DashboardEvent from 'components/Dashboard/DashboardEvent/dashboard.event'

const DashBoardEventDetailForm = props => {
  const {attendees, eventDetail} = props
  return (
    <Grid container className='dashboard-event-detail' spacing={24}>
      <Grid item md={12} sm={12} xs={12}>
        <div className='dashboard-event-detail__container'>
          <div className='dashboard-event-detail__top-bar'>
            <div className='dashboard-event-detail__top-bar-title'>
              <Link to='/dashboard'>
                <ArrowBack />
                Back to events
              </Link>
            </div>
            <ProfileIcon />
          </div>
          <div className='dashboard-event-detail__event-number'>
            Detail Event: # { eventDetail ? eventDetail['_id'] : '' }
          </div>
          <div className='dashboard-event-detail__columns'>
            <DashboardEvent eventInfo={eventDetail} />
            <div className='dashboard-event-detail__attendees'>
              <div className='dashboard-event-detail__attendees-title'>
                Attendees
              </div>
              <div className='dashboard-event-detail__attendees-items'>
                {attendees}
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default DashBoardEventDetailForm
