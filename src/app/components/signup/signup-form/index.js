// @vendors
import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

// styles to override in components
import inputStyles from 'components/with.styles/input'

// components
import CustomButton from '../../custom-button';
import TwoColumnLayout from '../../two-column-layout';

// util functions
import utils from '../../../utils/utils';

import './style.scss';

class SignUpForm extends Component {
    state = {
        email: '',
        errors: {
            firstName: { error: false, message: '' },
            lastName: { error: false, message: '' },
            email: { error: false, message: '' },
            password: { error: false, message: '' },
            repeatPassword: { error: false, message: '' }
        },
        errorInSignUp: false,
        fields: {
            firstName: '',
            lastName: '',
            password: '',
            repeatPassword: ''
        },
        showPassword: false,
        showRepeatPassword: false,
        successSignUp: false
    }

    handleClickShowPasssword = (fieldName) => {
        const { [fieldName]: field } = this.state;
        this.setState({ [field]: !field });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    signUpUser = () => {
        // @todo implement
    }

    signUpFailure = () => {
        // @todo implement
    }

    onClickSignUpBtn = () => {
        const {
            email,
            errors,
            firstName,
            lastName,
            password,
            repeatPassword
        } = this.state;

        const fieldsToCheck = {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        };

        const fieldsValid = utils.fieldsAreValid(fieldsToCheck, errors);

        if (fieldsValid) {
            // dispatch this action to sign up a new user
            this.signUpUser({
                firstName,
                lastName,
                email,
                password
            });
        } else {
            this.signUpFailure('All fields with * are required');
        }
    }

    handleInputChange(inputName, { target }, type = '') {
        const { errors } = this.state;
        const fieldValue = target.value;
        const validField = utils.fieldIsValid(inputName, fieldValue, type);

        const newStateErrors = Object.assign({}, errors, {
            [inputName]: { error: validField[inputName], message: validField.message }
        });
        // update the state with the values and errors
        this.setState({
            [inputName]: fieldValue,
            errors: newStateErrors
        });
    }

    buildSecondTitleText() {
        const { errorInSignUp, successSignUp } = this.state;

        if (!errorInSignUp && !successSignUp) {
            return <div className="second-title">Enter your details below</div>;
        }

        if (!errorInSignUp && successSignUp) {
            return <div className="second-title">server success message!</div>;
        }

        return <div className="second-title">server error!</div>;
    }

    renderFormFields() {
        const {
            errors: {
                email: errEmail,
                firstName: errFirstName,
                lastName: errLastName,
                password: errPassword,
                repeatPassword: errRepeatedPass
            },
            fields: {
                email,
                firstName,
                lastName,
                password,
                repeatPassword
            },
            showPassword,
            showRepeatPassword
        } = this.state;

        const { classes } = this.props;

        return (
            <Fragment>
                <div className="first-name-container">
                    <TextField
                        className="text-field-container"
                        error={errFirstName.error}
                        id="firstName"
                        label="First Name"
                        margin="normal"
                        onChange={event => this.handleInputChange('email', event)}
                        value={firstName}
                    />
                </div>
                <div className="lastname-container">
                    <TextField
                        className="text-field-container"
                        error={errLastName.error}
                        id="lastName"
                        label="Last name"
                        margin="normal"
                        onChange={event => this.handleChange('lastName', event)}
                        value={lastName}
                    />
                </div>
                <div className="lastname-container">
                    <TextField
                        className="text-field-container"
                        error={errEmail.error}
                        id="email"
                        label="Email"
                        margin="normal"
                        onChange={event => this.handleChange('email', event)}
                        value={email}
                    />
                </div>
                <div className="lastname-container">
                    <TextField
                        className="text-field-container"
                        error={errPassword.error}
                        id="password"
                        label="Password"
                        margin="normal"
                        onChange={event => this.handleChange('password', event)}
                        value={password}
                    />
                </div>
                <div className="lastname-container">
                    <TextField
                        className="text-field-container"
                        error={errRepeatedPass.error}
                        id="lastName"
                        label="Repeat password"
                        margin="normal"
                        onChange={event => this.handleChange('repeatPassword', event)}
                        value={repeatPassword}
                    />
                </div>
            </Fragment>
        );
    }

    render() {
        const topLinkTitle = (
            <div className="sign-up-link">
                <Link to="/signup">Already have an account? SIGN IN </Link>
            </div>
        );

        const secondTitle = this.buildSecondTitleText();
        const formTitles = (
            <div className="main-titles-container">
                <div className="title">Get started absolutely free.</div>
                {secondTitle}
            </div>
        );

        const formFields = this.renderFormFields();

        return (
            <div className="signup-page">
                <TwoColumnLayout>
                    {topLinkTitle}
                    {formTitles}
                    {formFields}
                    <CustomButton onClickHandler={this.onClickSignUpBtn} text="SIGN IN" />
                </TwoColumnLayout>
            </div>
        );
    }
}
// bind component to the store
export default withStyles(inputStyles)(SignUpForm);
