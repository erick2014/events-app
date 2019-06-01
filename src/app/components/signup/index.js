import React, { Component } from 'react'
// redux stuff
import { connect } from 'react-redux'
import signUpActions from 'reduxConfig/actions/signUp'
import SignUpForm from './signup-form'

class SignUp extends Component {
  render () {
    return (
      <div className='container'>
        <SignUpForm {...this.props} />
      </div>
    )
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
    signUp: signUpActions.signUp,
    signUpFailure: signUpActions.signUpFailure
  }
)(SignUp)
