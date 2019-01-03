import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';

import Navigation from '../../components/navigation/component';
import Google from './components/google/component';

// Styles
import './styles.css';

export default class PageLogin extends Component {

    state = {
        loading: true,
        redirect: false,
        processing: false,
        username: '',
        password: '',
        error: null
    };

    componentDidMount() {
        document.title = 'KL - Login';

        this.validateToken().then((valid) => {
            if (valid) {
                this.setState({
                    redirect: true,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        }, (error) => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <div className='page-login'>
                <Navigation />
                { this.renderPage() }
            </div>
        );
    }
    
    renderPage = () => {
        if (this.state.loading) {
            return this.renderLoading();
        } else if (this.state.redirect) {
            return (
                <Redirect to='/dashboard'></Redirect>
            );
        } else {
            return this.renderMain();
        }
    }
    
    renderLoading = () => {
        return (
            <span>Loading...</span>
        );
    }
    
    renderMain = () => {
        return (
            <div className='page-content'>
                <div className='content-section-google content-section'>
                    <Google/>
                </div>
                <div className='content-section-or content-section'>
                    <div>
                        <span>or</span>
                    </div>
                </div>
                <div className='content-section-manual content-section'>
                    { this.renderError() }
                    <form onSubmit={ this.submitLogin }>
                        <input type='text' value={ this.state.username } onChange={ this.updateUsernameField } placeholder='Username' required></input>
                        <input type='password' value={ this.state.password } onChange={ this.updatePasswordField } placeholder='Password' required></input>
                        <input type='submit' value='Login'></input>
                    </form>
                </div>
            </div>
        );
    }
    
    renderError = () => {
        if (this.state.error === null) {
            return (
                <div style={{ hidden: true }}></div>
            );
        } else {
            return (
                <div className='request-error'>
                    <span style={{ 'backgroundColor': 'pink' }}>{ this.state.error }</span>
                </div>
            );
        }
    }

    validateToken = () => {
        return new Promise((resolve, reject) => {
            const token = this.getAuthToken();

            if (!token) {
                resolve(false);
                return;
            }
            
            axios.post('/dashboard/do/auth/session/validate', {
                _a: token
            }).then(res => {
                const data = res.data;

                if (data) {
                    const index = data.index;

                    if (index) {
                        const valid = index.valid;
                        resolve(valid);

                        return;
                    }
                }

                reject('An error occurred.');
            }, err => {
                reject(err.message);
            });
        });
    }
    
    updateUsernameField = (event) => {
        this.setState({
            error: null, // Stop showing error if we edit any fields.
            username: event.target.value
        });
    }
    
    updatePasswordField = (event) => {
        this.setState({
            error: null,
            password: event.target.value
        });
    }
    
    submitLogin = (event) => {
        event.preventDefault();
        
        // Don't try login if we're already trying.
        if (this.state.processing) {
            return;
        }
        
        this.setState({
            processing: true
        });
        
        const username = this.state.username;
        const password = this.state.password;
        
        axios.post('/dashboard/do/auth/login', {
            username: username,
            password: password
        }).then(res => {
            const data = res.data;

            if (data) {
                const index = data.index;

                if (index) {
                    const token = index._a;

                    this.setAuthToken(token);

                    this.setState({
                        redirect: true,
                        processing: false
                    });
                } else {
                    this.setState({
                        error: data.error,
                        processing: false
                    });
                }
                return;
            } else {
                this.setState({
                    processing: false,
                    error: 'An internal error occurred.'
                });
            }
        }, err => {
            this.setState({
                processing: false,
                error: err.message
            });
        });
    }

    getAuthToken = () => {
        return sessionStorage.getItem('_a');
    }

    setAuthToken = (token) => {
        sessionStorage.setItem('_a', token);
    }

}