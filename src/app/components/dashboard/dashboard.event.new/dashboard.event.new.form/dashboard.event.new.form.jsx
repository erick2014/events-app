import React, { Component } from 'react'
// material ui stuff
import { FormControl, FormHelperText } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { withStyles } from 'material-ui/styles'
// util functions
import utils from 'utils/utils'
// components
import CustomButton from 'components/custom.button/custom.button'
// styles to override in components
import inputStyles from 'components/with.styles/input'

class DashboardEventNewForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      capacity: '',
      errors: {
        'capacity': {error: false, message: ''},
        'time': { error: false, message: '' },
        'title': { error: false, message: '' },
        'description': { error: false, message: '' },
        'date': { error: false, message: '' }
      }
    }
    this.onClickCreateEventBtn = this.onClickCreateEventBtn.bind(this)
    this.buildFeedBackText = this.buildFeedBackText.bind(this)
  }

  handleInputChange (inputName, event, type = '') {
    let validField = utils.fieldIsValid(inputName, event.target.value, type)

    let newStateErrors = Object.assign({}, this.state.errors, {
      [inputName]: {error: validField[inputName], message: validField['message']}
    })
    // update the state with the values and errors
    this.setState({
      [inputName]: event.target.value,
      'errors': newStateErrors
    })
  }

  onClickCreateEventBtn () {
    const { createEvent, eventFailure } = this.props
    const fieldsToCheck = {
      'capacity': this.state.capacity,
      'time': this.state.time,
      'title': this.state.title,
      'description': this.state.description,
      'date': this.state.date
    }
    const fieldsValid = utils.fieldsAreValid(fieldsToCheck, this.state.errors)

    if (fieldsValid) {
      let currentDate = new Date()
      currentDate.setDate(currentDate.getDate() + 1)
      const newObject = {
        'startsAt': currentDate,
        'capacity': parseInt(this.state.capacity),
        'title': this.state.title,
        'description': this.state.description
      }

      createEvent(newObject)
    } else {
      eventFailure('All fields are required')
    }
  }

  buildFeedBackText () {
    const { events: { error, errorMessage, success, successMessage } } = this.props
    let componentToRender

    if (!error && !success) {
      componentToRender = <div className='dasboard-event-new__feedback-text'>Enter your details below</div>
    } else if (success && !error) {
      componentToRender = <div className='dasboard-event-new__feedback-text'>{successMessage}</div>
    } else {
      componentToRender = <div className='dasboard-event-new__feedback-text--red'>{errorMessage}</div>
    }
    return componentToRender
  }

  render () {
    const { classes } = this.props
    const feedbackText = this.buildFeedBackText()
    console.log('current state ', this.state)
    return (
      <div className='dasboard-event-new__form custom-box-shadow'>

        <div className='dasboard-event-new__form-title'>
          <h1>Create new event</h1>
          {feedbackText}
        </div>

        <div className='dasboard-event-new__form-fields'>
          <div className='dasboard-event-new__form-input'>
            <FormControl
              fullWidth
              margin='normal'
              required
              error={this.state.errors.title.error}
              >
              <InputLabel classes={{root: classes.rootLabel}}>
                Title
              </InputLabel>
              <Input
                classes={{inkbar: classes.inkbar, error: classes.error}}
                value={this.state.title}
                onChange={event => this.handleInputChange('title', event)}
                />
              <FormHelperText>
                {this.state.errors.title ? this.state.errors.title.message : ''}
              </FormHelperText>
            </FormControl>
          </div>

          <div className='dasboard-event-new__form-input'>
            <FormControl
              fullWidth
              margin='normal'
              required
              error={this.state.errors.description.error}
              >
              <InputLabel classes={{root: classes.rootLabel}}>
                Description
              </InputLabel>
              <Input
                classes={{inkbar: classes.inkbar, error: classes.error}}
                value={this.state.description}
                onChange={event => this.handleInputChange('description', event)}
                />
              <FormHelperText>
                {this.state.errors.description ? this.state.errors.description.message : ''}
              </FormHelperText>
            </FormControl>
          </div>

          <div className='dasboard-event-new__form-input'>
            <FormControl
              fullWidth
              margin='normal'
              required
              error={this.state.errors.date.error}
              >
              <InputLabel classes={{root: classes.rootLabel}}>
                Date
              </InputLabel>
              <Input
                classes={{inkbar: classes.inkbar, error: classes.error}}
                value={this.state.date}
                onChange={event => this.handleInputChange('date', event)}
                />
              <FormHelperText>
                {this.state.errors.date ? this.state.errors.date.message : ''}
              </FormHelperText>
            </FormControl>
          </div>

          <div className='dasboard-event-new__form-input'>
            <FormControl
              fullWidth
              margin='normal'
              required
              error={this.state.errors.time.error}
              >
              <InputLabel classes={{root: classes.rootLabel}}>
                Time
              </InputLabel>
              <Input
                classes={{inkbar: classes.inkbar, error: classes.error}}
                value={this.state.time}
                onChange={event => this.handleInputChange('time', event, 'time')}
                />
              <FormHelperText>
                {this.state.errors.time ? this.state.errors.time.message : ''}
              </FormHelperText>
            </FormControl>
          </div>

          <div className='dasboard-event-new__form-input'>
            <FormControl
              fullWidth
              margin='normal'
              required
              error={this.state.errors.capacity.error}
              >
              <InputLabel classes={{ root: classes.rootLabel }}>
                Capacity test
              </InputLabel>
              <Input
                classes={{inkbar: classes.inkbar, error: classes.error}}
                value={this.state.capacity}
                onChange={event => this.handleInputChange('capacity', event, 'int')}
                />
              <FormHelperText>
                {this.state.errors.capacity ? this.state.errors.capacity.message : ''}
              </FormHelperText>
            </FormControl>
          </div>

          <div className='dasboard-event-new__submit-btn'>
            <CustomButton text={'CREATE NEW EVENT'} onClickHandler={this.onClickCreateEventBtn} />
          </div>
        </div>

      </div>
    )
  }
}

export default withStyles(inputStyles)(DashboardEventNewForm)
