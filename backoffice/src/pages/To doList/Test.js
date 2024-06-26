import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'; // Importez v4 comme uuidv4

class Test extends Component {
	constructor(props) {
		
		super(props)
		const savedItems = JSON.parse(localStorage.getItem('todoItems')) || [];

		this.state={
			items: savedItems,
			itemsToShow: "all",
			id: uuidv4(),
			item: '',
			editItem: false,
		}
	}
	componentDidUpdate() {
		// Sauvegardez les données dans localStorage chaque fois que l'état est mis à jour
		localStorage.setItem('todoItems', JSON.stringify(this.state.items));
	}

	handleChange = event => {
		this.setState({
			item: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		
		const newItem = {
			id: this.state.id,
			title: this.state.item,
			completed: false
		}
		
		const updatedItems = [...this.state.items, newItem]

		if (this.state.item.length > 0) {
			this.setState({
				items: updatedItems,
				id: uuidv4(),
				item: '',
				editItem: false
			})
		}
	}

	updateTodosToShow = string => {
		this.setState({
			itemsToShow: string
		});
	};

	handleDoneTask = (id, completed) => {
		const filteredItems = this.state.items.map(item => {
			item.id === id && (item.completed = !item.completed)
			return item
		})

		this.setState({
			items: filteredItems,
		})
	}

	handleDelete = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id)

		this.setState({
			items: filteredItems
		})
	}

	handleEdit = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id)

		const selectedItem = this.state.items.find(item => item.id === id)

		this.setState({
			items: filteredItems,
			id: id,
			item: selectedItem.title,
			editItem: true
		})
	}

	handleDeleteDoneTasks = () => {
		const filteredItems = this.state.items.filter(item => item.completed === false)

		this.setState({
			items: filteredItems
		})
	}

	clearList = () => {
		this.setState({
			items: []
		})
	}

	render() {
		let items = []

		if (this.state.itemsToShow === "all") {
			items = this.state.items;
		} else if (this.state.itemsToShow === "todo") {
			items = this.state.items.filter(item => !item.completed);
		} else if (this.state.itemsToShow === "done") {
			items = this.state.items.filter(item => item.completed);			
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">
						<h3 className="text-capitalize text-center">TodoInput</h3>
						<TodoInput
							item={this.state.item}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
						/>
						<TodoList
							items={items}
							filterDoneTasks={this.filterDoneTasks}
							clearList={this.clearList}
							handleDelete={this.handleDelete}
							handleEdit={this.handleEdit}
							handleDoneTask={this.handleDoneTask}
							handleDeleteDoneTasks={this.handleDeleteDoneTasks}
							updateTodosToShow={this.updateTodosToShow}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Test;