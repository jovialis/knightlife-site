import React from 'react';

import { requirePermission } from '../../utils/auth';

import Calendar from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Feather from 'feather-icons';

import axios from 'axios';
axios.defaults.withCredentials = true;

import {default as DashboardLayout, HeaderTitleContent} from '../../layouts/dashboard';
import Head from "next/head";

import ActionButton from '../../components/actionButton';
import DropButton from '../../components/dropButton';

export default class extends React.Component {

	static async getInitialProps({req, res}) {
		const user = await requirePermission('lunch', req, res, '/dashboard');

		const date = new Date();
		const lunchRes = await axios.get(`https://api.bbnknightlife.com/d/lunch/menu/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);

		const lunch = lunchRes.data.menu;

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

		axios.post(`https://api.bbnknightlife.com/d/lunch/menu/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/submit`, {
			__v: __v,
			title: title,
			items: items
		},{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
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
			<DashboardLayout headerContent={(<HeaderTitleContent title="Lunch Menu"/>)} headerMargin={"10px"}>
				<Head>
					<title key="title">Dashboard - Lunch</title>
				</Head>
				<div id="options">
					<div id="calendar">
						<DropButton title={this.state.selectedDate.toLocaleDateString('en-US')} icon='calendar' onClick={event => this.setState({pickerHidden: !(this.state.pickerHidden)})}/>
						<div>
							{
								this.state.pickerHidden ?
									<span/>
									:
									<Calendar
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
					<ActionButton onClick={this.saveChanges} title="SAVE"/>
				</div>
				<div id="content">
					<div id="name">
						<h1>MENU NAME</h1>
						<input type='text' value={this.state.title} onChange={event => this.setState({title: event.target.value})} placeholder='e.g. Taco Tuesday'/>
					</div>
					<div id="foods">
						<h1>FOODS</h1>
						{
							this.state.current.map(item => <LunchItem item={item} key={item.badge ? item.badge : this.state.current.indexOf(item)} remove={this.removeFoodFromMenu(item)}/>)
						}
					</div>
				</div>
				<div id="add">
					<div>
						<h1>ADD FOODS</h1>
						<input type='text' value={this.state.addName} onChange={event => this.setState({addName: event.target.value}, () => this.fetchSuggestedFoods())}
						       placeholder='Name' required/>
						<br/>
						<input type='text' value={this.state.addAllergy} onChange={event => this.setState({addAllergy: event.target.value})}
						       placeholder='Allergy' required/>
						<DropButton onClick={this.appendFoodToMenu} icon='plus' title='Add to Menu'/>
						<br/>
						<div>
							<div>
								{
									this.state.suggested.map(item => <SuggestedLunchItem item={item} key={this.state.suggested.indexOf(item)} add={this.appendSuggestedItemToMenu(item)} hide={this.hideSuggestedItem(item)}/>)
								}
							</div>
						</div>
					</div>
				</div>
				<style jsx>{`
					h1 {
						color: #A0A0B2;
						font-size: 14px;
						font-weight: 500;
					}

					#options {
						width: 100%;
						display: flex;
						justify-content: space-between;
					}

					#content {
						margin-top: 60px;
					}

					#content #name input {
						width: calc(100% - 20px);

						font-size: 14px;
						font-weight: 500;

						background-color: #F7F7F8;
						border: 1px solid #DCDCE3;

						color: #8C8CA0;

						border-radius: 3px;

						padding: 10px 10px 10px 10px;
					}

					#content #name input[value=''] {
					    background-color: #ECECF0;
						color: #C5C5D0;
						font-weight: 400;
					}

					#content #name {
						margin-bottom: 40px;
					}

					#content {
						margin-bottom: 40px;
					}

					#add input {
						width: calc(100% - 20px);

						font-size: 14px;
						font-weight: 500;

						background-color: #F7F7F8;
						border: 1px solid #DCDCE3;

						color: #8C8CA0;

						border-radius: 3px;

						padding: 10px 10px 10px 10px;
					}

					#add input[value=''] {
					    background-color: #ECECF0;
						color: #C5C5D0;
						font-weight: 400;
					}
				`}</style>
			</DashboardLayout>
		);
	}

}

const LunchItem = (props) => (

	<div className="lunch-item">
		<div id="actions">
			<button onClick={props.remove}>
				<div dangerouslySetInnerHTML={{__html: Feather.icons["trash-2"].toSvg()}}>

				</div>
			</button>
		</div>
		<div id="content">
			<h6>Name: {props.item.name}</h6>
			<h6>Allergy: {props.item.allergy}</h6>
		</div>
		<style jsx>{`
			.lunch-item {
				display: flex;

				background-color: #F7F7F8;
				border: 1px solid #DCDCE3;

				border-radius: 3px;
			}

			.lunch-item #actions {
				margin-top; 25px;

				width: 50px;

				display: flex;
				justify-content: flex-start;

				flex-direction: column;
			}

			.lunch-item #actions button:first-child {
				margin-top: 2px;
			}


			.lunch-item #actions button {
				margin-top: 20px

				padding: 0;
				border: none;

				background-color: transparent;

				color: #C1C1D3;
			}

			.lunch-item #actions button:hover {
				color: #f24848;
				cursor: pointer;
			}

			.lunch-item #content {
				flex-grow: 1;

				width: 50px;
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

