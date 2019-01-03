import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import axios from 'axios';

import Navigation from '../../components/navigation/component';
import Module from './components/module/component';

// Styles
import './styles.css';

export default class PageDashboard extends Component {

    state = {
        redirect: false,
        validating: true,
        loading: true,
        overview: null,
        modules: null
    }

    componentDidMount() {
        document.title = 'KL - Dashboard';

        this.validateToken().then((valid) => {
            if (valid) {
                this.setState({
                    validating: false
                });
            } else {
                this.setState({
                    redirect: true,
                    validating: false
                });
            }
        }, (error) => {
            this.setState({
                redirect: true,
                validating: false
            });
        });
    }

    componentDidUpdate() {
        // If we're no longer validating, and we don't have to redirect and we haven't loaded yet
        if (!this.state.validating && !this.state.redirect && this.state.loading) {
            axios.post('/dashboard/page/home', {
                _a: this.getAuthToken()
            }).then(res => {
                const data = res.data;

                if (data) {
                    const index = data.index;

                    if (index) {
                        this.setState({
                            overview: index.overview,
                            modules: index.modules,
                            loading: false
                        });

                        return;
                    }
                }
                
                this.setState({
                    loading: false
                });
            }, err => {
                this.setState({
                    loading: false
                });
            });
        }
    }

    render() {
        return (
            <div id='page-dashboard'>
                <Navigation />
                { this.renderPage() }
            </div>
        );
    }

    renderPage = () => {
        if (this.state.validating) {
            return (
                <span>Authenticating...</span>
            );
        } else if (this.state.redirect) {
            return (
                <Redirect to='/login'></Redirect>
            );
        } else if (this.state.loading) {
            return (
                <span>Loading...</span>
            );
        } else {
            return this.renderMain();
        }
    }

    renderMain = () => {
        return (
            <div id='page-body'>
                <section id='page-header'>
                    <div className='tray'>
                        <div className='tray-bumper page-dimensions'>
                            <div className='tray-content'>
                                <img className='profile-image' src={ this.state.overview.picture }></img>
                                <div className='profile-info offset-left'>
                                    <div className='profile-info-name'>
                                        <span>{ this.state.overview.name }</span>
                                    </div>
                                    <div className='profile-info-username'>
                                        <span>{ this.state.overview.username }</span>
                                    </div>
                                </div>
                                <div className='profile-actions offset-left'>
                                    <div className='profile-actions-logout'>
                                        <button onClick={ this.doLogout }>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='page-content' className='page-dimensions'>
                    <section id='content-modules'>
                        <span className='modules-header'>Modules</span>
                        <div className='modules-body'>
                            { 
                                this.state.modules.map((module) => {
                                    return (
                                        <Module module={ module }></Module>
                                    );
                                }) 
                            }
                        </div>
                    </section>
                </section>
            </div>
        );
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
    
    doLogout = (event) => {
        event.preventDefault();
        
        this.setAuthToken(null);
        
        this.setState({
            redirect: true
        });
    }

    getAuthToken = () => {
        return sessionStorage.getItem('_a');
    }
    
    setAuthToken = (token) => {
        return sessionStorage.setItem('_a', token);
    }

}