import React, { Component, Fragment } from 'react'
import { forceCheck } from 'react-lazyload'
import MovieCard from './components/MovieCard'
import data from './data/mock-data.json'
import './styles/style.sass'

class App extends Component {
  state = {
    filteredData: data,
    searchText: '',
  }

  sortByTitle = () => {
    const { filteredData } = this.state
    filteredData.sort((a, b) => a.title.localeCompare(b.title))

    this.setState({ filteredData })
    forceCheck()
  }

  resultsIntimation = () => {
    const { filteredData } = this.state
    return filteredData.length > 0
      ? `Found ${filteredData.length} results.`
      : 'Nothing matched your query.'
  }

  searchHandler = value => {
    this.setState(
      {
        searchText: value,
        filteredData: data.filter(obj => {
          return (
            obj.title.toLowerCase().search(`${value.toLowerCase()}`) !== -1 ||
            obj.genre.toLowerCase().search(`${value.toLowerCase()}`) !== -1 ||
            obj.music.toLowerCase().search(`${value.toLowerCase()}`) !== -1
          )
        }),
      },
      () => {
        forceCheck()
      }
    )
  }

  render() {
    const { searchText, filteredData } = this.state
    return (
      <div className="cp-container">
        <div className="cp-inner" />
        <div className="cp-input-container">
          <input
            onChange={e => this.searchHandler(e.target.value)}
            value={searchText}
            placeholder="Search for a movie by title, genre or music"
            type="text"
          />
        </div>
        <button onClick={this.sortByTitle}>Sort by title</button>
        <p className="cp-common-description">{this.resultsIntimation()}</p>
        <div className="cp-movie-card-container">
          {filteredData &&
            filteredData.length > 0 &&
            filteredData.map(elem => (
              <Fragment key={elem.id}>
                <MovieCard elem={elem} />
              </Fragment>
            ))}
        </div>
      </div>
    )
  }
}

export default App
