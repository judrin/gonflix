import React, { Component } from 'react';
import SearchPresenter from './SearchPresenter';
import { movieApi, tvApi } from 'api';

class SearchContainer extends Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: '',
    loading: false,
    error: null
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit = () => {
    const { searchTerm } = this.state;

    if (searchTerm !== '') {
      this.searchByTerm();
    }
  }

  searchByTerm = () => {
    const { searchTerm } = this.state;

    this.setState({
      loading: true
    });

    Promise.all([
      movieApi.search(searchTerm),
      tvApi.search(searchTerm)
    ])
      .then(([movieResults, tvResults]) => {
        this.setState({
          movieResults,
          tvResults,
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          error: "Can't find TV information.",
          loading: false
        })
      })
  }

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    console.log(this.state);
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default SearchContainer;