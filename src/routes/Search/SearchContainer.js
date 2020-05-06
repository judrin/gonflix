import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import SearchPresenter from './SearchPresenter';
import { movieApi, tvApi } from 'api';

class SearchContainer extends Component {
  state = {
    movieResults: null,
    tvResults: null,
    loading: false,
    error: null
  };

  handleChange = (event) => {
    const term = event.target.value;
    this.debouncedSearchByTerm(term);
  }

  updateTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  searchByTerm = (term) => {
    if (!term) {
      this.setState({
        movieResults: null,
        tvResults: null
      });

      return;
    }

    console.log(term);

    this.setState({
      loading: true,
    });

    Promise.all([movieApi.search(term), tvApi.search(term)])
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

  debouncedSearchByTerm = debounce(this.searchByTerm, 250);

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleChange={this.handleChange}
      />
    );
  }
}

export default SearchContainer;
