// @vendors
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { withStyles } from '@material-ui/core/styles'

// components
import CustomButton from 'components/custom.button/custom.button'

// start wars img
import startWars from 'images/starWars.png'

const styles = theme => ({
  textField: {
    width: 480
  },
  button: {
    'background-color': '#5ac296',
    'font-size': 10,
    'color': '#fff',
    'width': 240,
    'height': 57
  }
})

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false
  }

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handleMouseDownPassword = (event) => {
    event.preventDefault()
  };

  handleChange = (inputName, event) => {
    this.setState({ [inputName]: event.target.value })
  }

  onClickSubmitBtn = () => {
    const { login } = this.props
    login({ 'email': this.state.email, 'password': this.state.password })
  }

  buildFillingText = () => {
    const { users: { error, errorMessage } } = this.props
    let componentToRender
    if (!error) {
      componentToRender = <div className='login-form__right-column-fill-in-text'>Enter your details below</div>
    } else {
      componentToRender = <div className='login-form__right-column-fill-in-text--red'>{errorMessage}</div>
    }
    return componentToRender
  }

  setSessionInLocalStorage = (user) => {
    const userInfoAsString = JSON.stringify(user)
    window.localStorage.setItem('eventioSession', userInfoAsString)
  }

  buildPageContent() {
    const {
      classes,
      users: {
        error,
        success,
        userInfo
      }
    } = this.props

    const {
      email,
      showPassword,
      password
    } = this.state

    const fillInText = this.buildFillingText()

    if (success) {
      this.setSessionInLocalStorage(userInfo)
      return (
        <Redirect
          to={{
            pathname: `/dashboard`,
            state: { from: this.props.history.location }
          }}
        />
      )
    }

    return (
      <div container='true' className='login-form'>
        <div className='login-form__left-column'>
          <div className='login-form__left-column-text'>
            <div>"Great, kid Don't get cocky."</div>
            <div className='login-form__left-column-text--green'>-</div>
            <div>Han solo</div>
          </div>
        </div>
        <div className='login-form__right-column'>
          <div className='login-form__right-column-signup-text'>
            <Link to='/signUp'>Don't have account? SIGN UP </Link>
          </div>
          <div className='login-form__right-column-form-fields'>
            <form>
              <div>
                <div>Sign in to Eventio.</div>
                {fillInText}
              </div>
              <div>
                <TextField
                  className={classes.textField}
                  error={error}
                  id='email'
                  label='Email'
                  defaultValue='Email'
                  value={email}
                  margin='normal'
                  onChange={event => this.handleChange('email', event)}
                />
              </div>
              <div>
                <FormControl className={classes.formControl} error={error} margin='normal'>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input
                    className={classes.textField}
                    id='loginPasswordField'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={event => this.handleChange('password', event)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={this.handleClickShowPasssword}
                          onMouseDown={event => this.handleMouseDownPassword(event)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className='login-form__right-column-submit-btn'>
                <CustomButton text={'SIGN IN'} onClickHandler={this.onClickSubmitBtn} />
              </div>
            </form>
          </div>
        </div>
      </div >
    )
  }

  render() {
    return this.buildPageContent()
  }
}

export default withStyles(styles)(LoginForm)
