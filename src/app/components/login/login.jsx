import React, { Component } from 'react'
// redux stuff
import { connect } from 'react-redux'
import loginActions from 'reduxConfig/actions/login'
import LoginForm from 'components/login/login.form/login.form'

class Login extends Component {
  render () {
    return <LoginForm {...this.props} />
  }
}
// bind component to the store
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
