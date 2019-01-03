// 

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import axios from 'axios';

import Navigation from '../../../components/navigation/component';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// Styles
import './styles.css';

export default class PageLunch extends Component {

    state = {
        selectedDate: new Date(),
        
        pickerHidden: true,
        
        title: '',
        current: [],
        __v: -1,
        
        addName: '',
        addAllergy: '',
        
        suggested: [],
    }

    componentDidMount() {
        document.title = 'KL Dashboard - Lunch';
        
        this.fetchDateResults();
    }

    render() {
        return (
            <div className='page-dashboard-lunch'>
                <Navigation />
                <h1>Lunch</h1>
                { this.renderPage() }
            </div>
        );
    }

    renderPage = () => {
        return (
            <div>
                <div style={{ 'backgroundColor': 'lightgray' }}>
                    <div onClick={ () => { this.setState({ pickerHidden: !(this.state.pickerHidden) }) } }>
                        <span style={{ 'color': 'red' }}>
                            { this.state.selectedDate.toLocaleDateString('en-US') }
                        </span>
                    </div>
                    <div style={{ 'position': 'absolute', 'left': 0, 'backgroundColor': 'lightgray' }}>
                        {
                        this.state.pickerHidden ? 
                            (<span></span>)
                            :
                            (<DayPicker 
                                month={ this.state.selectedDate }
                                todayButton={ 'Today' } 
                                onDayClick={ this.updateSelectedDate }
                                selectedDays={ this.state.selectedDate }
                                onTodayButtonClick={ (day, modifiers) => { this.setState({ selectedDate: day }) } }
                                style={{ 'position': 'absolute', left: 0, 'backgroundColor': 'white' }}
                            />)
                        }
                    </div>
                </div>
                <button onClick={ this.pushChangesToServer }>SAVE</button>
                <div>
                    <h5>Today Menu</h5>
                    <input type='text' value={ this.state.title } onChange={ this.updateTitleField } placeholder='Menu Name'></input>
                    <ul>
                        {
                            this.state.current.map((item) => {
                                return (
                                    <AddedFood item={ item } onRemove={ this.removeFood } />
                                );
                            })
                        }
                    </ul>
                </div>
                <label>
                    <h4>Add Food</h4>
                    <input type='text' value={ this.state.addName } onChange={ this.updateNameField } placeholder='Food Name' required></input>
                    <br></br>
                    <input type='text' value={ this.state.addAllergy } onChange={ this.updateAllergyField } placeholder='Food Allergy' required></input>
                    <button onClick={ this.addFoodField }>Add</button>
                    <br></br>
                    <div>
                        <h4></h4>
                        <div>
                            {
                                this.state.suggested.map((item) => {
                                    return (
                                        <SuggestedFood item={ item } onSelect={ this.addItemToCurrent } delete={ this.removeItemFromSuggestions } />
                                    );
                                })
                            }
                        </div>
                    </div>
                </label>
            </div>
        );
    }
    
    updateSelectedDate = (day) => {
        this.setState({
            selectedDate: day 
        }, () => {
            this.fetchDateResults();
        });
    }
    
    updateTitleField = (event) => {
        this.setState({
            title: event.target.value
        });
    }
    
    updateNameField = (event) => {
        this.setState({
            addName: event.target.value
        }, () => {
            this.fetchSearchResults();
        });
    }
    
    updateAllergyField = (event) => {
        this.setState({
            addAllergy: event.target.value
        });
    }

    addFoodField = () => {
        const name = this.state.addName;
        const allergy = this.state.addAllergy;
        
        this.setState({
            addName: '',
            addAllergy: '',
            
            current: [
                ...this.state.current,
                {
                    name: name,
                    allergy: allergy
                }
            ]
        });
    }
    
    removeFood = (item) => {
        let items = this.state.current;
        
        const index = items.indexOf(item);
        
        if (index === -1) {
            return;
        }
        
        items.splice(index, 1);
        
        this.setState({
            current: items
        });
    }
    
    fetchSearchResults = () => {
        const searchTerm = this.state.addName.trim();
        if (searchTerm.length === 0) {
            this.setState({
                suggested: []
            });
            return;
        }
        
        axios.post('/dashboard/page/lunch/food/suggest', {
//            _a: this.getAuthToken(),
            text: searchTerm
        }).then(res => {
            // If we've changed the search terms.
            if (this.state.addName.trim() !== searchTerm) {
                return;
            }
            
            const data = res.data;

            if (data) {
                const index = data.index;

                if (index) {
                    this.setState({
                        suggested: index.items
                    });

                    return;
                }
            }
        });
    }
    
    addItemToCurrent = (item) => {
        this.setState({
            addName: '',
            addAllergy: '',
            suggested: [],
            current: [
                ...this.state.current,
                item
            ]
        });
    }
    
    removeItemFromSuggestions = (item) => {
        const badge = item.badge;
        
        axios.post('/dashboard/page/lunch/food/suggest/do/hide', {
            badge: badge
        }).then(res => {
            this.fetchSearchResults(); 
        });
    }
    
    fetchDateResults = () => {
        const date = this.state.selectedDate;

        axios.post(`/dashboard/page/lunch/${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }`, {
//            _a: this.getAuthToken()    
        }).then(res => {
            // Selected date changed
            if (this.state.selectedDate !== date) {
                return;
            }
            
            const data = res.data;
            
            if (data) {
                const index = data.index;
                
                if (index) {
                    const lunch = index.lunch;
                    
                    const title = lunch.title ? lunch.title : '';
                    const items = lunch.items;
                    
                    const __v = lunch.__v;
                    
                    this.setState({
                        title: title,
                        current: items,
                        __v: __v
                    });
                }
            }
        });
    }
    
    pushChangesToServer = () => {
        const date = this.state.selectedDate;
        
        const __v = this.state.__v;
        const title = this.state.title;
        const items = this.state.current;
        
        axios.post(`/dashboard/page/lunch/${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }/do/update`, {
            __v: __v,
            title: title,
            items: items
        }).then(res => {
            this.fetchDateResults();
            
            this.setState({
                addName: '',
                addAllergy: '',
                suggested: [],
            });
        });
    }
    
    getAuthToken = () => {
        return sessionStorage.getItem('_a');
    }
    
    setAuthToken = (token) => {
        return sessionStorage.setItem('_a', token);
    }

}

class AddedFood extends Component {
    
    render() {
        return (
            <li style={{ 'backgroundColor': 'pink' }}>
                <h6>Name: { this.props.item.name }</h6>
                <h6>Allergy: { this.props.item.allergy }</h6>
                <br></br>
                <button onClick={ this.remove }>Remove from Menu</button>
            </li>
        );
    }
    
    remove = () => {
        this.props.onRemove(this.props.item);
    }
    
}

class SuggestedFood extends Component {
    
    constructor(props) {
        super(props);
        
        console.log(JSON.stringify(props))
    }
    
    render() {
        return (
            <div>
                <div style={{ 'backgroundColor': 'yellow', 'border': '1px solid gray' }}>
                    <b style={{ 'color': 'brown' }}>Suggested Food</b>
                    <h4>{ this.props.item.name }</h4>
                    <h5>{ this.props.item.allergy }</h5>
                    <button onClick={ this.selected }>Add to Menu</button>
                    <button onClick={ this.doDelete }>Stop suggesting this food</button>
                </div>
            </div>
        );
    }
    
    selected = () => {
        this.props.onSelect(this.props.item);
    }
    
    doDelete = () => {
        this.props.delete(this.props.item);
    }
    
}