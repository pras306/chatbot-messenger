import React from 'react';
import { Person, Email, Lock } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import './Register.css';
import history from '../../history';
import { signIn, setLoader } from '../../actions';
import { CHAT_REGISTER } from '../../api/requests';

const required = value => !value ? "Required Field" : undefined;
const minLength = value => value && value.length < 6 ? "Must be 6 characters or more" : undefined;
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid Email Address" : undefined;

const renderForm = ({ input, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="register__form__content__container">
            <input { ...input } className="register__form__content__input" type={type} placeholder={placeholder} />
            { touched && error && <span className="input__error">{error}</span> }
        </div>
    )
};

const Register = (props) => {
    const { handleSubmit, signIn, setLoader } = props;

    const onRegister = (formValues) => {
        setLoader(true);
        fetch(`${CHAT_REGISTER}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                name: formValues.username,
                email: formValues.email,
                password: formValues.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.error) {
                setLoader(false);
                alert(user.error.message);
            } else {
                signIn({
                    name: user.data.name,
                    email: user.data.email,
                    avatar: `https://robohash.org/${Math.random() * 200}?size=200x200`
                });
                history.push('/rooms');
                setLoader(false);
            }
        })
        .catch(err => {
            setLoader(false);
            alert(err.message);
        });
    }

    return (
        <div className="register">
            <form className="register__form" onSubmit={(e) => e.preventDefault()}>
                <div className="register__form__header">Sign Up</div>
                <div className="register__form__content">
                    <Person />
                    <Field name="username" component={renderForm} type="text" placeholder="Your username" validate={[required]} />
                </div>
                <div className="register__form__content">
                    <Email />
                    <Field name="email" component={renderForm} type="text" placeholder="Your email" validate={[required, email]} />
                </div>
                <div className="register__form__content">
                    <Lock />
                    <Field name="password" component={renderForm} type="password" placeholder="Your password" validate={[required, minLength]} />
                </div>
                <button className="register__form__button" onClick={handleSubmit(onRegister.bind(this))}>Register</button>
                <div className="register__form__footer">
                    <p>Already a member? <Link to='/login' className="register__form__footer__link">Sign In</Link></p>
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
    { signIn, setLoader }
)(Register);

export default reduxForm({
    form: "registerForm"
})(decoratedComponent);

