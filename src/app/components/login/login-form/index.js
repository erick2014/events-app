// @vendors
import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';

// @components
import CustomButton from 'components/custom-button/';
import TwoColumnLayout from '../../two-column-layout';

// @constants
import { BASE_URL } from '../../../constants/server';

class LoginForm extends Component {
    state = {
        email: '',
        error: false,
        password: '',
        showPassword: false
    }

    handleClickShowPasssword = () => {
        const { showPassword } = this.state;
        this.setState({ showPassword: !showPassword });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleChange = (inputName, event) => {
        this.setState({
            [inputName]: event.target.value,
            error: false
        });
    }

    onClickSubmitBtn = () => {
        const { email, password } = this.state;
        this.login(email, password);
    }

    getInformativeMessage = () => {
        let message = '';
        let className = 'second-title';

        const { error } = this.state;

        if (error) {
            className = `second-title ${className}--error`;
            message = 'Oops! That email and password combination is not valid.';
        } else {
            message = 'Enter your details below';
        }

        return <div className={className}>{message}</div>;
    }

    setSessionInLocalStorage = (user) => {
        window.localStorage.setItem('userSession', JSON.stringify(user));
    }

    async login(email, password) {
        const serverUrl = `${BASE_URL}user/auth`;
        const requestData = { user: email, password };
        const performLogin = () => axios.post(serverUrl, requestData)
            .then(resp => resp.data);
        try {
            await performLogin();
            this.setState({ error: false });
        } catch (error) {
            this.setState({ error: true });
        }
    }

    renderFormFields = () => {
        const {
            email,
            error,
            password,
            showPassword
        } = this.state;

        return (
            <Fragment>
                <div className="email-container textfield-container">
                    <TextField
                        className="email-field text-field-container"
                        defaultValue="Email"
                        error={error}
                        id="email"
                        label="Email"
                        margin="normal"
                        onChange={event => this.handleChange('email', event)}
                        value={email}
                    />
                </div>
                <div className="password-container textfield-container">
                    <FormControl className="password-field" error={error} margin="normal">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            endAdornment={(
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={this.handleClickShowPasssword}
                                        onMouseDown={event => this.handleMouseDownPassword(event)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )}
                            id="loginPasswordField"
                            onChange={event => this.handleChange('password', event)}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                        />
                    </FormControl>
                </div>
            </Fragment>
        );
    }

    render() {
        const success = false;
        const userInfo = {};

        if (success) {
            this.setSessionInLocalStorage(userInfo);
            return (<Redirect to="/dashboard" />);
        }

        const formFields = this.renderFormFields();
        const topLinkTitle = (
            <div className="sign-up-link">
                <Link to="/signUp">Dont have account? SIGN UP </Link>
            </div>
        );

        const informativeMessage = this.getInformativeMessage();
        const formTitles = (
            <div className="main-titles-container">
                <div className="title">Sign in to Eventio.</div>
                {informativeMessage}
            </div>
        );

        return (
            <div className="login-page">
                <TwoColumnLayout>
                    {topLinkTitle}
                    {formTitles}
                    {formFields}
                    <CustomButton onClickHandler={this.onClickSubmitBtn} text="SIGN IN" />
                </TwoColumnLayout>
            </div>
        );
    }
}

export default LoginForm;
