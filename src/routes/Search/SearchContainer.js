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
  };

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit = (event) => {
    event && event.preventDefault();
    const { searchTerm } = this.state;

    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  searchByTerm = () => {
    const { searchTerm } = this.state;

    this.setState({
      loading: true,
    });

    console.log("searching");

    Promise.all([movieApi.search(searchTerm), tvApi.search(searchTerm)])
      .then(([movieResultsResponse, tvResultsResponse]) => {
        this.setState({
          movieResults: movieResultsResponse.data.results,
          tvResults: tvResultsResponse.data.results,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: "Can't find results.",
          loading: false,
        });
      });
  };

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}

export default SearchContainer;
