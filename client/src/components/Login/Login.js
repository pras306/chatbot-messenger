import React from 'react';
import { Email, Lock } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import './Login.css';
import GSignIn from '../../assets/images/GoogleSignIn.png';
import history from '../../history';
import { auth, provider } from '../../api/firebase';
import { signIn } from '../../actions';
import { CHAT_SIGNIN } from '../../api/requests';

const required = value => !value ? "Required Field" : undefined;
const minLength = value => value && value.length < 6 ? "Must be 6 characters or more" : undefined;
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid Email Address" : undefined;

const renderForm = ({ input, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="login__form__content__container">
            <input { ...input } className="login__form__content__input" type={type} placeholder={placeholder} />
            { touched && error && <span className="input__error">{error}</span> }
        </div>
    )
};

const Login = (props) => {
    const { handleSubmit, signIn } = props;

    const onLogin = (formValues) => {
        fetch(`${CHAT_SIGNIN}`,{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                email: formValues.email,
                password: formValues.password,
                isGoogleSignIn: false
            })
        })
        .then(response => response.json())
        .then( user => {
            if(user.Error) {
                alert(user.Error);
            } else {
                signIn({
                    name: user.name,
                    email: user.email,
                    avatar: `https://robohash.org/${Math.random() * 200}?size=200x200`
                });
                history.push('/rooms');
            }
        })
        .catch(err => alert(err.message));
    }

    const onGSignIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            fetch(`${CHAT_SIGNIN}`, {
                method: "POST",
                headers: { 
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    password: "",
                    isGoogleSignIn: true
                })
            })
            .then(response => response.json())
            .then(user => {
                if(user.Error) {
                    alert(user.Error);
                } else {
                    signIn({
                        name: user.name,
                        email: user.email,
                        avatar: `https://robohash.org/${Math.random() * 200}?size=200x200`
                    });
                    history.push('/rooms');
                }
            })
            .catch(err => alert(err.message));
        })
        .catch(err => alert(err.message));
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={(e) => e.preventDefault()}>
                <div className="login__form__header">Sign In</div>
                <div className="login__form__content">
                    <Email />
                    <Field name="email" component={renderForm} type="text" placeholder="Your email" validate={[required, email]} />
                </div>
                <div className="login__form__content">
                    <Lock />
                    <Field name="password" component={renderForm} type="password" placeholder="Your password" validate={[required, minLength]} />
                </div>
                <div className="login__form__error"></div>
                <button className="login__form__button" onClick={handleSubmit(onLogin.bind(this))}>Sign in</button>
                <img className="login__form__image" alt="Google Sign In" src={GSignIn} onClick={onGSignIn} />
                <div className="login__form__footer">
                    <p>Not a member? <Link to='/register' className="login__form__footer__link">Sign Up</Link></p>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return { user: state.authUser }
};

const decoratedComponent = connect(
    mapStateToProps,
    { signIn }
)(Login);

export default reduxForm({
    form: "loginForm"
})(decoratedComponent);
