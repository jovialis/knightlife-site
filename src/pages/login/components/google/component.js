import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.css';

export default class Google extends Component {

    render() {
        return (
            <div className="component-google">
                <a href='/login/google'>
                    <div className='google-scaffold'>
                        <div className='google-section-left google-section'>
                            <img src='/assets/google.png' alt='Google'></img>
                        </div>
                        <div className='google-section-right google-section'>
                            <span>Sign in with Google</span>
                        </div>
                    </div>
                </a>
            </div>
        );
    }

}