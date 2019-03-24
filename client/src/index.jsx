import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getTopRepos = this.getTopRepos.bind(this);
    this.newSetState = this.newSetState.bind(this);
  }

  componentDidMount() {
    console.log('Component Mounted');
    this.getTopRepos()
  }

  newSetState(repos) {
    this.setState({repos: repos})
  }

  getTopRepos() {
    console.log('Collected Top Repos');
    var updateRepos = this.newSetState;
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      contentType: "application/json",
      success: function(response) {
        updateRepos(response)
      },
      error: function(error) {
        console.log(error)
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    var getTheseRepos = this.getTopRepos
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      contentType: "application/json",
      data: JSON.stringify({'text': term}),
      success: function(result) {
        result = JSON.parse(result);
        for (var i = 0; i < result.length; i++) {
          // console.log(result[i].id, result[i].name, result[i].forks);
          console.log(result[i]);
        }
        getTheseRepos()
      },
      error: function() {
        console.log('error');
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));