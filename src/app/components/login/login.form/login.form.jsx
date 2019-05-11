// react stuff
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
// material ui components
import TextField from 'material-ui/TextField/TextField'
import withStyles from 'material-ui/styles/withStyles'
import FormControl from 'material-ui/Form/FormControl'
import Input from 'material-ui/Input'
import InputLabel from 'material-ui/Input/InputLabel'
import InputAdornment from 'material-ui/Input/InputAdornment'
import IconButton from 'material-ui/IconButton/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
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
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      showPassword: false
    }
    this.onClickSubmitBtn = this.onClickSubmitBtn.bind(this)
    this.buildFillingText = this.buildFillingText.bind(this)
    this.handleClickShowPasssword = this.handleClickShowPasssword.bind(this)
    this.buildPageContent = this.buildPageContent.bind(this)
  }

  handleClickShowPasssword () {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handleMouseDownPassword (event) {
    event.preventDefault()
  };

  handleChange (inputName, event) {
    this.setState({ [inputName]: event.target.value })
  }

  onClickSubmitBtn () {
    const { login } = this.props
    login({ 'email': this.state.email, 'password': this.state.password })
  }

  buildFillingText () {
    const { users: { error, errorMessage } } = this.props
    let componentToRender
    if (!error) {
      componentToRender = <div className='login-form__right-column-fill-in-text'>Enter your details below</div>
    } else {
      componentToRender = <div className='login-form__right-column-fill-in-text--red'>{errorMessage}</div>
    }
    return componentToRender
  }

  setSessionInLocalStorage (user) {
    const userInfoAsString = JSON.stringify(user)
    window.localStorage.setItem('eventioSession', userInfoAsString)
  }

  buildPageContent () {
    const { classes, users: {error, success, userInfo} } = this.props
    const fillInText = this.buildFillingText()

    if (success) {
      this.setSessionInLocalStorage(userInfo)
      return (
        <Redirect
          to={{
            pathname: `/dashboard`,
            state: {from: this.props.history.location}
          }}
        />
      )
    }
    return (
      <div container className='login-form'>
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
                  error={error}
                  id='email'
                  label='Email'
                  className={classes.textField}
                  defaultValue='Email'
                  value={this.state.email}
                  onChange={event => { this.handleChange('email', event) }}
                  margin='normal'
                />
              </div>
              <div>
                <FormControl className={classes.formControl} error={error} margin='normal'>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input
                    className={classes.textField}
                    id='adornment-password'
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={event => this.handleChange('password', event)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={this.handleClickShowPasssword}
                          onMouseDown={event => this.handleMouseDownPassword(event)}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
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
      </div>
    )
  }

  render () {
    return this.buildPageContent()
  }
}
// bind component to the store
export default withStyles(styles)(LoginForm)
