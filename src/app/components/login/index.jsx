// @vendors
import React from 'react'
import { connect } from 'react-redux'
import loginActions from 'reduxConfig/actions/login'
import LoginForm from 'components/login/login-form/'

const Login = props => <LoginForm {...props} />

export default connect(
  // map props
  state => ({
    users: state.users
  }),
  // map actions
  {
    login: loginActions.login
  }
)(Login)
