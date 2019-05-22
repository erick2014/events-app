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

// components
import CustomButton from 'components/custom.button/custom.button';

// start wars img
import startWars from 'images/starWars.png'

import './style.scss';

const styles = () => ({
    textField: { width: 480 }
});

class LoginForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    state = {
        email: '',
        password: '',
        showPassword: false
    }

    handleClickShowPasssword = () => {
        const { showPassword } = this.state;
        this.setState({ showPassword });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleChange = (inputName, event) => {
        this.setState({ [inputName]: event.target.value });
    }

    login = () => {
        // @Todo implement
    }

    onClickSubmitBtn = () => {
        const { email, password } = this.state;
        this.login({ email, password });
    }

    buildFillingText = () => (<div className="second-title">Enter your details below</div>)

    setSessionInLocalStorage = (user) => {
        window.localStorage.setItem('userSession', JSON.stringify(user));
    }

    buildPageContent() {
        const { classes } = this.props;

        const error = false;
        const success = false;
        const userInfo = {};

        const {
            email,
            password,
            showPassword
        } = this.state;

        const fillInText = this.buildFillingText();

        if (success) {
            this.setSessionInLocalStorage(userInfo);
            return (<Redirect to="/dashboard" />);
        }

        return (
            <div className="login-form">
                <div className="login-form__left-column">
                    <div className="login-form__left-column-text">
                        <div>"Great, kid Don"t get cocky."</div>
                        <div className="login-form__left-column-text--green">-</div>
                        <div>Han solo</div>
                    </div>
                </div>
                <div className="login-form__right-column">
                    <div className="signup-text">
                        <Link to="/signUp">Don"t have account? SIGN UP </Link>
                    </div>
                    <div className="form-fields-container">
                        <div className="form-fields">
                            <form>
                                <div>
                                    <div className="main-title">Sign in to Eventio.</div>
                                    {fillInText}
                                </div>
                                <div>
                                    <TextField
                                        className={classes.textField}
                                        defaultValue="Email"
                                        error={error}
                                        id="email"
                                        label="Email"
                                        margin="normal"
                                        onChange={event => this.handleChange('email', event)}
                                        value={email}
                                    />
                                </div>
                                <div>
                                    <FormControl className={classes.formControl} error={error} margin="normal">
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
                                </div>
                                <div className="login-form__right-column-submit-btn">
                                    <CustomButton onClickHandler={this.onClickSubmitBtn} text="SIGN IN" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this.buildPageContent();
    }
}

export default withStyles(styles)(LoginForm);
