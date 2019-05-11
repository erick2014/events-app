import React, { Component } from 'react'
// material ui components
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
// util functions
import utils from 'utils/utils'
// styles to override in components
import inputStyles from 'components/with.styles/input'
// components
import CustomButton from 'components/custom.button/custom.button'

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      showPassword: false,
      showRepeatPassword: false,
      errors: {
        'firstName': {error: false, message: ''},
        'lastName': {error: false, message: ''},
        'email': {error: false, message: ''},
        'password': {error: false, message: ''},
        'repeatPassword': {error: false, message: ''}
      }
    }

    this.onClickSignUpBtn = this.onClickSignUpBtn.bind(this)
    this.handleClickShowPasssword = this.handleClickShowPasssword.bind(this)
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this)
  }

  handleClickShowPasssword (field) {
    this.setState({ [field]: !this.state[field] })
  }

  handleMouseDownPassword (event) {
    event.preventDefault()
  };

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
    this.setState({ [inputName]: event.target.value })
  }

  onClickSignUpBtn () {
    const { signUp, signUpFailure } = this.props
    const fieldsToCheck = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword
    }
    const fieldsValid = utils.fieldsAreValid(fieldsToCheck, this.state.errors)

    if (fieldsValid) {
      // dispatch this action to sign up a new user
      signUp({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
    } else {
      // dispatch this action to show up a validation message in the ui
      signUpFailure('All fields with * are required')
    }
  }

  buildFillingText () {
    const { users: { error, errorMessage, success, successMessage } } = this.props
    let componentToRender
    if (!error && !success) {
      componentToRender = <div className='sign-up-form__right-column-fill-in-text'>Enter your details below</div>
    } else if (success && !error && successMessage !== '') {
      componentToRender = <div className='sign-up-form__right-column-fill-in-text'>{successMessage}</div>
    } else {
      componentToRender = <div className='sign-up-form__right-column-fill-in-text--red'>{errorMessage}</div>
    }
    return componentToRender
  }

  render () {
    const { classes } = this.props
    const fillInText = this.buildFillingText()
    const {firstName: errFirstName, lastName: errLastName, email: errEmail, password: errPassword, repeatPassword: errRepeatedPass} = this.state.errors

    return (
      <Grid container className='sign-up-form' spacing={24}>
        <Grid item md={3} className='sign-up-form__left-column'>
          <div className='sign-up-form__left-column-bg-gray'>
            <div className='sign-up-form__left-column-text'>
              <div>"Great, kid Don't get cocky."</div>
              <div className='sign-up-form__left-column-text--green'>-</div>
              <div>Han solo</div>
            </div>
          </div>
        </Grid>
        <Grid item md={9} className='sign-up-form__right-column'>
          <div>
            <div className='sign-up-form__right-column-signin-text'>
              <Link to='/'>Already have an account? SIGN IN </Link>
            </div>
            <div className='sign-up-form__right-column-form-fields'>
              <form>

                <div className='sign-up-form__right-column-title'>
                  <h1>
                    Get started absolutely free.
                  </h1>
                  {fillInText}
                </div>

                <div className='sign-up-form__right-column-input'>
                  <FormControl
                    fullWidth
                    margin='normal'
                    required
                    error={errFirstName.error}
                    >
                    <InputLabel classes={{root: classes.rootLabel}}>
                      First name
                    </InputLabel>
                    <Input
                      classes={{inkbar: classes.inkbar, error: classes.error}}
                      value={this.state.firstName}
                      onChange={event => this.handleInputChange('firstName', event)}
                     />
                    <FormHelperText>
                      {errFirstName ? errFirstName.message : ''}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className='sign-up-form__right-column-input'>
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    margin='normal'
                    required
                    error={errLastName.error}
                  >
                    <InputLabel classes={{root: classes.rootLabel}}>
                      Last name
                    </InputLabel>
                    <Input
                      classes={{inkbar: classes.inkbar, error: classes.error}}
                      value={this.state.lastName}
                      onChange={event => this.handleInputChange('lastName', event)}
                     />
                    <FormHelperText>
                      {errLastName ? errLastName.message : ''}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className='sign-up-form__right-column-input'>
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    margin='normal'
                    required
                    error={errEmail.error}
                  >
                    <InputLabel classes={{root: classes.rootLabel}}>
                      Email
                    </InputLabel>
                    <Input
                      classes={{inkbar: classes.inkbar, error: classes.error}}
                      value={this.state.email}
                      onChange={event => this.handleInputChange('email', event, 'email')}
                     />
                    <FormHelperText>
                      {errEmail ? errEmail.message : ''}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className='sign-up-form__right-column-input'>
                  <FormControl
                    className={classes.formControl}
                    error={errPassword.error}
                    margin='normal'
                    fullWidth>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                      classes={{inkbar: classes.inkbar, error: classes.error}}
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      onChange={event => this.handleInputChange('password', event)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => { this.handleClickShowPasssword('showPassword') }}
                            onMouseDown={event => this.handleMouseDownPassword(event)}
                          >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {errPassword ? errPassword.message : ''}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className='sign-up-form__right-column-input'>
                  <FormControl
                    className={classes.formControl}
                    error={errRepeatedPass.error}
                    margin='normal'
                    fullWidth>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                      classes={{inkbar: classes.inkbar, error: classes.error}}
                      type={this.state.showRepeatPassword ? 'text' : 'password'}
                      value={this.state.repeatPassword}
                      onChange={event => this.handleInputChange('repeatPassword', event)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => { this.handleClickShowPasssword('showRepeatPassword') }}
                            onMouseDown={event => this.handleMouseDownPassword(event)}
                          >
                            {this.state.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {errRepeatedPass ? errRepeatedPass.message : ''}
                    </FormHelperText>
                  </FormControl>

                </div>

                <div className='login-form__right-column-submit-btn'>
                  <CustomButton text={'SIGN UP'} onClickHandler={this.onClickSignUpBtn} />
                </div>

              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}
// bind component to the store
export default withStyles(inputStyles)(SignUpForm)
