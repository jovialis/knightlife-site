import React from 'react';
import DayPicker from 'react-day-picker';

import axios from 'axios';

import {default as DashboardLayout, HeaderTitleContent} from '../../layouts/dashboard';
import Head from "next/head";

export default class PageLunch extends React.Component {

	static async getInitialProps({req}) {
		const date = new Date();
		const res = await axios.get(`https://api.bbnknightlife.com/d/lunch/menu/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);

		const lunch = res.data.menu;

		const title = lunch.title ? lunch.title : '';
		const items = lunch.items;
		const __v = lunch.__v;

		return {
			date: date,
			title: title,
			current: items,
			__v: __v
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			selectedDate: new Date(props.date),
			pickerHidden: true,

			addName: '',
			addAllergy: '',

			suggested: [],

			title: props.title,
			current: props.current,
			__v: props.__v
		}
	}

	fetchMenuForSelectedDate = () => {
		const date = this.state.selectedDate;

		axios.get(`https://api.bbnknightlife.com/d/lunch/menu/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, {}).then(res => {
			const lunch = res.data.menu;

			const title = lunch.title ? lunch.title : '';
			const items = lunch.items;

			const __v = lunch.__v;

			this.setState({
				title: title,
				current: items,
				__v: __v
			});
		});
	};

	appendFoodToMenu = () => {
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
	};

	appendSuggestedItemToMenu = (item) => {
		return () => {
			this.setState({
				addName: '',
				addAllergy: '',

				suggested: [],

				current: [
					...this.state.current,
					item
				]
			});
		};
	};

	removeFoodFromMenu = (item) => {
		return () => {
			let items = this.state.current;

			const index = items.indexOf(item);

			if (index === -1) {
				return;
			}

			items.splice(index, 1);

			this.setState({
				current: items
			});
		};
	};

	fetchSuggestedFoods = () => {
		const searchTerm = this.state.addName.trim();
		if (searchTerm.length === 0) {
			this.setState({
				suggested: []
			});
			return;
		}

		axios.get(`https://api.bbnknightlife.com/d/lunch/suggest?term=${searchTerm}`).then(res => {
			// If we've changed the search terms.
			if (this.state.addName.trim() !== searchTerm) {
				return;
			}

			const data = res.data;

			if (data) {
				this.setState({
					suggested: data.items
				});
			}
		});
	};

	hideSuggestedItem = (item) => {
		return () => {
			const badge = item.badge;

			axios.post(`https://api.bbnknightlife.com/d/lunch/suggest/hide/${badge}`).then(res => {
				this.fetchSuggestedFoods();
			});
		};
	};

	saveChanges = () => {
		const date = this.state.selectedDate;

		const __v = this.state.__v;
		const title = this.state.title;
		const items = this.state.current;

		axios.post(`https://api.bbnknightlife.com/d/lunch/menu/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, {
			__v: __v,
			title: title,
			items: items
		}).then(async res => {
			this.setState({
				addName: '',
				addAllergy: '',
				suggested: []
			}, () => {
				this.fetchMenuForSelectedDate();
			});
		});
	};

	render() {
		return (
			<DashboardLayout headerContent={(<HeaderTitleContent title="Lunch Menus"/>)}>
				<Head>
					<title key="title">Dashboard - Lunch</title>
				</Head>
				<div id="select-date">
					<div onClick={event => this.setState({pickerHidden: !(this.state.pickerHidden)})}>
                        <span>
                            {
	                            this.state.selectedDate.toLocaleDateString('en-US')
                            }
                        </span>
					</div>
					<div>
						{
							this.state.pickerHidden ?
								<span/>
								:
								<DayPicker
									month={this.state.selectedDate}
									todayButton={'Today'}
									onDayClick={day => this.setState({selectedDate: day}, async () => this.fetchMenuForSelectedDate())}
									selectedDays={this.state.selectedDate}
									onTodayButtonClick={(day, modifiers) => this.setState({selectedDate: day})}
									style={{'position': 'absolute', left: 0, 'backgroundColor': 'white'}}
								/>
						}
					</div>
				</div>
				<button onClick={this.saveChanges}>SAVE</button>
				<div>
					<h5>Today Menu</h5>
					<input type='text' value={this.state.title} onChange={event => this.setState({title: event.target.value})} placeholder='Menu Name'/>
					<ul>
						{
							this.state.current.map(item => <LunchItem item={item} key={item.badge ? item.badge : this.state.current.indexOf(item)} remove={this.removeFoodFromMenu(item)}/>)
						}
					</ul>
				</div>
				<label>
					<h4>Add Food</h4>
					<input type='text' value={this.state.addName} onChange={event => this.setState({addName: event.target.value}, () => this.fetchSuggestedFoods())}
					       placeholder='Food Name' required/>
					<br/>
					<input type='text' value={this.state.addAllergy} onChange={event => this.setState({addAllergy: event.target.value})}
					       placeholder='Food Allergy' required/>
					<button onClick={this.appendFoodToMenu}>Add</button>
					<br/>
					<div>
						<h4/>
						<div>
							{
								this.state.suggested.map(item => <SuggestedLunchItem item={item} key={this.state.suggested.indexOf(item)} add={this.appendSuggestedItemToMenu(item)} hide={this.hideSuggestedItem(item)}/>)
							}
						</div>
					</div>
				</label>
				<style jsx>{`

				`}</style>
			</DashboardLayout>
		);
	}

}

const LunchItem = (props) => (

	<div className="lunch-item">
		<h6>Name: {props.item.name}</h6>
		<h6>Allergy: {props.item.allergy}</h6>
		<br/>
		<button onClick={props.remove}>Remove from Menu</button>
		<style jsx>{`
			.lunch-item {
				display: flex;
				background-color: pink;
			}
		`}</style>
	</div>

);

const SuggestedLunchItem = (props) => (

	<div className="lunch-suggested-item">
		<b style={{'color': 'brown'}}>Suggested Food</b>
		<h4>{props.item.name}</h4>
		<h5>{props.item.allergy}</h5>
		<button onClick={props.add}>Add to Menu</button>
		<button onClick={props.hide}>Stop suggesting this food</button>
		<style jsx>{`
			.lunch-suggested-item {
				background-color: yellow;
				border: 1px solid gray;
			}
		`}</style>
	</div>

);

