import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import feather from 'feather-icons';

import './styles.css';

export default class ComponentModule extends Component {

    render() {
        return (
            <div id={ `modules-item-${ this.props.module.id }` } className='component-module'>
                <Link to={ `/dashboard/${ this.props.module.id }` }>
                    <div className='module-bumper'>
                        <div className='module-icon-wrapper module-element' dangerouslySetInnerHTML={{ __html: feather.icons[this.props.module.icon].toSvg() }}></div>
                        <div className='module-body module-element'>
                            <span>{ this.props.module.name }</span>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

}