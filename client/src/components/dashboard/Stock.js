import axios from 'axios'
import React, { Component } from "react";

class App extends Component {

  constructor() {
    super();
    this.state = {
      search: "",//stores user's search
      results: [],//stores search results
      city: []//stores city data
    };

    this.onChange = this.onChange.bind(this)
    this.getData = this.getData.bind(this)
    this.onSelectCity = this.onSelectCity.bind(this)
  }

  //takes search input
  onChange = (e) => {
    this.setState({search: e.target.value, results: [], city: []})
  }

  //retrives data from Teleport API about results matching the search
  getData = async (e) => {
    e.preventDefault();
    const response = await axios(`https://api.teleport.org/api/cities/?search=${this.state.search}`)
    const searchResults = response.data._embedded["city:search-results"]//returns an array of all results based on search
    this.setState({ search: this.state.search, results: searchResults, city: [] });
  }

  //takes user input, retrieves data from Teleport API about chosen city 
  onSelectCity = async (city) => {
    const cityRes = await axios(city._links["city:item"].href)
    this.setState({ search: this.state.search, results: this.state.results, city: cityRes })
  }

  render(){
    return (
      <div className="text">
        <form>
          <div>
            <input 
            type="text"
            className="form-control city-input"
            name="city" 
            placeholder="Enter city here"
            onChange={this.onChange}
            ></input>
          </div>
          <div className="list-group">
              {this.state.results.map((result, i) => (
              <button
              key={`search ${i}`} 
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => this.onSelectCity(result)}
              >{result.matching_full_name}
              </button>
              ))}
          </div>
        </form>
        <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
      </div> 
    );
  }
}

export default App;
