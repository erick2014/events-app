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
import TwoColumnLayout from '../../two-column-layout';

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

    renderFormFields = () => {
        const { classes } = this.props;
        const {
            email,
            password,
            showPassword
        } = this.state;

        const fillInText = this.buildFillingText();
        const error = false;

        return (
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
        const topLinkTitle = <Link to="/signUp">Don"t have account? SIGN UP </Link>;

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
