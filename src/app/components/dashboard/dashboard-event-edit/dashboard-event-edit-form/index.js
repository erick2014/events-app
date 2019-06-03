// react stuff
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
// material ui
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

// components
import ProfileIcon from 'components/ProfileIcon/ProfileIcon'
import CustomCircle from 'components/custom.circle/custom.circle'

const styles = {
  chip: {
    'color': '#949EA8',
    'backgroundColor': '#D9DCE1'
  },
  button: {
    'background-color': '#5ac296',
    'font-size': 10,
    'color': '#fff',
    'width': 240,
    'height': 57
  },
  rootLabel: {
    color: '#D8D8D8'
  }
}

class DashBoardEventEditForm extends Component {
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

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setDefaultInfoForInputs(nextProps)
  }

  setDefaultInfoForInputs (nextProps) {
    const {defaultEventInfo} = nextProps

    this.setState({
      title: defaultEventInfo.title,
      description: defaultEventInfo.description,
      date: defaultEventInfo.date,
      time: defaultEventInfo.time,
      capacity: defaultEventInfo.capacity,
      id: defaultEventInfo.id
    })
  }

  handleInputChange (inputName, event) {
    this.setState({ [inputName]: event.target.value })
  }

  render () {
    const { attendees, classes, onClickSaveIcon } = this.props
    const { date, time, title, description, capacity, id } = this.state
    return (
      <Grid container className='dashboard-event-edit' spacing={24}>
        <Grid item md={12} sm={12} xs={12}>
          <div className='dashboard-event-edit__container'>

            <div className='dashboard-event-edit__top-bar'>
              <div className='dashboard-event-edit__top-bar-title'>
                <Link to='/dashboard'>Back to events </Link>
              </div>
              <ProfileIcon />
            </div>

            <div className='dashboard-event-edit__event-number'>
              Detail Event: # { id }
            </div>

            <div className='dashboard-event-edit__columns'>
              <div className='dashboard-event'>
                <div className='dashboard-event__input'>
                  <FormControl
                    fullWidth
                    margin='normal'
                    required
                    >
                    <label classes={{root: classes.rootLabel}}>
                      Date
                    </label>
                    <input type="text"
                      value={date}
                      onChange={event => this.handleInputChange('date', event)}
                      />
                  </FormControl>
                </div>

                <div className='dashboard-event__input'>
                  <FormControl
                    fullWidth
                    margin='normal'
                    required
                    >
                    <div classes={{root: classes.rootLabel}}>
                      Time
                    </div>
                    <input
                      type="text"
                      value={time}
                      onChange={event => this.handleInputChange('time', event)}
                      />
                  </FormControl>
                </div>

                <div className='dashboard-event__input'>
                  <FormControl
                    fullWidth
                    margin='normal'
                    required
                    >
                    <div classes={{root: classes.rootLabel}}>
                      Title
                    </div>
                    <input
                      type="text"
                      value={title}
                      onChange={event => this.handleInputChange('title', event)}
                      />
                  </FormControl>
                </div>

                <div className='dashboard-event__input'>
                  <FormControl
                    fullWidth
                    margin='normal'
                    required
                    >
                    <div classes={{root: classes.rootLabel}}>
                      Description
                    </div>
                    <input type="text"
                      value={description}
                      onChange={event => this.handleInputChange('description', event)}
                      />
                  </FormControl>
                </div>

                <div className='dashboard-event__input'>
                  <FormControl
                    fullWidth
                    margin='normal'
                    required
                    >
                    <div classes={{root: classes.rootLabel}}>
                      Capacity
                    </div>
                    <input type="text"
                      value={capacity}
                      onChange={event => this.handleInputChange('capacity', event)}
                      />
                  </FormControl>
                </div>

              </div>

              <div className='dashboard-event-edit__attendees'>
                <div className='dashboard-event-edit__attendees-title'>
                  Attendees
                </div>
                <div className='dashboard-event-edit__attendees-items'>
                  {attendees}
                </div>
              </div>
            </div>

            <div className='dashboard-event-edit__footer'>
              <CustomCircle onClickIcon={() => { onClickSaveIcon(this.state) }} color={'greenCircle'} />
            </div>

          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(DashBoardEventEditForm)
