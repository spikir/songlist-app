import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import Add from './Add';
import Songs from './Songs';

class App extends Component {
	render() {
		return (
		<div className="container-fluid">
			<HashRouter>
				<div className="wrap">
					<div className="navi">
						<div className="col_nav_1">
							<Link to="/addItem">
								Add Item
							</Link>
						</div>
						<div className="col_nav_2">
							<Link to="/allSongs">
								All Items
							</Link>
						</div>
					</div>
					<Route path="/addItem" component={Add} />
					<Route path="/allSongs" component={Songs} />
				</div>
			  </HashRouter>
			</div>
		);
	}
}

export default App;
