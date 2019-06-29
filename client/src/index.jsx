import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';
import Repos from './components/Repos.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    axios
      .get('/repos')
      .then( (data) => {
        console.log('DATA',data.data[0].repos);
        this.setState({repos: data.data[0].repos})
      })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios
      .post('/repos', {user: term})
      .then( (data) => {
        var repos = data.data;
        this.setState({repos: repos});
      })
      .catch( (err) => {console.error('error posting', err)})
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <Repos repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));