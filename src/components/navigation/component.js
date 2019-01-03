import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.css';

export default class ComponentNavigation extends Component {

    render() {
        return (
            <div className='component-navigation component'>
                <div className='navigation-section-left navigation-section'>
                    <Link to='/'>
                        <img src='/assets/logo.png' alt='Knight'></img>
                    </Link>
                </div>
                <ul className='navigation-section-right navigation-section'>
                    <li className='navigation-section-segment navigation-section-segment-home'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='navigation-section-segment navigation-section-segment-help'>
                        <Link to='/help'><span>Help</span></Link>
                    </li>
                    <li className='navigation-section-segment navigation-section-segment-dashboard'>
                        <Link to='/login'>Dashboard</Link>
                    </li>
                </ul>
            </div>
        );
    }

}