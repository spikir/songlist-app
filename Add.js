import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			title: '',
			artist: '',
			album: '',
			duration: '',
			hookurl: ''
		};
	}
	
	save() {
		//Copied
		const formData = new FormData();
		formData.append('id', this.state.id);
		formData.append('title', this.state.title);
		formData.append('artist', this.state.artist);
		formData.append('album', this.state.album);
		formData.append('duration', this.state.duration);
		formData.append('hook_url', this.state.hookurl);
		fetch('http://localhost/api/songs/', {
			method: 'POST',
			body: formData
		})
		.then(response => response.json());
	}
	
	handleChange(name, e) {
		var change = {};
		change[name] = e.target.value;
		this.setState(change);
	}
	
	render() {
		return (
			<div>
				<div className="form-group">
					<label>ID</label>
					<input type="text" className="form-control" value={ this.state.id } onChange={ this.handleChange.bind(this, 'id') } id="id"/>
				</div>
				<div className="form-group">
					<label>Title</label>
					<input type="text" className="form-control" value={ this.state.title } onChange={ this.handleChange.bind(this, 'title') } id="title"/>
				</div>
				<div className="form-group">
					<label>Artist</label>
					<input type="text" className="form-control" value={ this.state.artist } onChange={ this.handleChange.bind(this, 'artist') } id="artist"/>
				</div>
				<div className="form-group">
					<label>Album</label>
					<input type="text" className="form-control" value={ this.state.album } onChange={ this.handleChange.bind(this, 'album') } id="album"/>
				</div>
				<div className="form-group">
					<label>Duration</label>
					<input type="text" className="form-control" value={ this.state.duration } onChange={ this.handleChange.bind(this, 'duration') } id="duration"/>
				</div>
				<div className="form-group">
					<label>HookUrl</label>
					<input type="text" className="form-control" value={ this.state.hookurl } onChange={ this.handleChange.bind(this, 'hookurl') } id="hook_url"/>
				</div>
				<div className="form-group">
					<button onClick={() => {
						this.save()
					}}><Link to="/allSongs">Save</Link></button>
				</div>
			</div>
		);
	}
}

export default Add;