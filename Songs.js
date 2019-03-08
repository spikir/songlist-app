import React, { Component } from 'react';
import { Link } from "react-router-dom";

const EditSong = ({Song, change}) => {
	return (
		<div>
			<div className="form-group">
				<label>ID</label>
				<input type="text" className="form-control" value={ Song['id'] } onChange={ change(this, 'id') } id="id"/>
			</div>
			<div className="form-group">
				<label>Title</label>
				<input type="text" className="form-control" value={ Song['title'] } onChange={ change(this, 'title') } id="title"/>
			</div>
			<div className="form-group">
				<label>Artist</label>
				<input type="text" className="form-control" value={ Song['artist'] } onChange={ change(this, 'artist') } id="artist"/>
			</div>
			<div className="form-group">
				<label>Album</label>
				<input type="text" className="form-control" value={ Song['album'] } onChange={ change(this, 'album') } id="album"/>
			</div>
			<div className="form-group">
				<label>Duration</label>
				<input type="text" className="form-control" value={ Song['duration'] } onChange={ change(this, 'duration') } id="duration"/>
			</div>
			<div className="form-group">
				<label>HookUrl</label>
				<input type="text" className="form-control" value={ Song['hook_url'] } onChange={ change(this, 'hookurl') } id="hook_url"/>
			</div>
			<div className="form-group">
				<button onClick={() => {
					this.save()
				}}><Link to="/allSongs">Save</Link></button>
			</div>
		</div>
	);;
}

const SongList = ({List, edit, remove}) => {
	const ret = [];

	for (var key in List) {	
		let id = List[key]['id'];
		ret.push(
			<tr key={List[key]['id']}>
				<td>{List[key]['id']}</td>
				<td>{List[key]['title']}</td>
				<td>{List[key]['artist']}</td>
				<td>{List[key]['album']}</td>
				<td>{List[key]['duration']}</td>
				<td>{List[key]['hook_url']}</td>
				<td><button onClick={() => {
						edit(id)
					}}>Edit</button></td>
				<td><button onClick={() => {
						remove(id)
					}}>Remove</button></td>
			</tr>);
	}
	return ret;
}

class Songs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editSong: [],
			response: [],
			edit: false
		};
	
	}
	
	componentDidMount() {
		this.loadData();
	}
		
	loadData() {
		fetch('http://localhost/api/songs')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					response: responseJson
				})
		  }).catch((error) => {
			console.error(error);
		  });
	}
	
	edit(id) {
		fetch('http://localhost/api/songs/'+id)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				editSong: responseJson,
				edit: true
			})
		}).catch((error) => {
			console.error(error);
		});
	}
	
	remove(id) {
		fetch('http://localhost/api/songs/'+id, {method: 'DELETE'})
		.then((responseJson) => {
			this.loadData();
		}).catch((error) => {
			console.error(error);
		});
	}
	
	change(data, id) {
		console.log(data);
		console.log(id);
	}
	
	render() {
		if(this.state.edit == true) {
			return (
				<EditSong Song={this.state.editSong} change={this.change.bind(this)} />
			);
		}
		return (
			<div className="container-fluid">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Artist</th>
							<th>Album</th>
							<th>Duration</th>
							<th>HookUrl</th>
							<th>Edit</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						<SongList List = {this.state.response} edit = {this.edit.bind(this)} remove = {this.remove.bind(this)} />
					</tbody>
				</table>
			</div>
		);
	}
}

export default Songs;
