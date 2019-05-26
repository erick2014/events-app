// @vendors
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

// @components
import CustomButton from 'components/custom.button/custom.button';
import TwoColumnLayout from '../../two-column-layout';

// @constants
import { BASE_URL } from '../../../constants/server';

// @styles
import './style.scss';

class LoginForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

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
        const { classes } = this.props;
        const {
            email,
            error,
            password,
            showPassword
        } = this.state;

        const informativeMessage = this.getInformativeMessage();

        return (
            <form>
                <div>
                    <div className="main-title">Sign in to Eventio.</div>
                    {informativeMessage}
                </div>
                <TextField
                    className="email-field"
                    defaultValue="Email"
                    error={error}
                    id="email"
                    label="Email"
                    margin="normal"
                    onChange={event => this.handleChange('email', event)}
                    value={email}
                />
                <FormControl className="password-field" error={error} margin="normal">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        className={classes.textField}
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
                <div className="submit-btn">
                    <CustomButton onClickHandler={this.onClickSubmitBtn} text="SIGN IN" />
                </div>
            </form>
        );
    }

    render() {
        const success = false;
        const userInfo = {};

        if (success) {
            this.setSessionInLocalStorage(userInfo);
            return (<Redirect to="/dashboard" />);
        }

        const rightColumnContent = this.renderFormFields();
        const topLinkTitle = <Link to="/signUp">Dont have account? SIGN UP </Link>;

        return (
            <TwoColumnLayout
                rightColumnContent={rightColumnContent}
                topLinkTitle={topLinkTitle}
                wrapperPageClassName="login-page"
            />
        );
    }
}

export default withStyles(styles)(LoginForm);
