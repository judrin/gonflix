import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import SearchPresenter from './SearchPresenter';
import { movieApi, tvApi } from 'api';

class SearchContainer extends Component {
  state = {
    movieResults: null,
    tvResults: null,
    movieFavorites: {},
    tvFavorites: {},
    loading: false,
    error: null
  };

  componentDidMount() {
    let movieFavorites = localStorage.getItem('movieFavorites');
    let tvFavorites = localStorage.getItem('tvFavorites');
    movieFavorites = movieFavorites ? JSON.parse(movieFavorites) : {};
    tvFavorites = tvFavorites ? JSON.parse(tvFavorites) : {};

    this.setState({
      movieFavorites,
      tvFavorites,
    });
  }

  handleChange = (event) => {
    const term = event.target.value;
    this.debouncedSearchByTerm(term);
  }

  handleFavoriteClick = (event, id, isMovie = true) => {
    event.preventDefault();
    const favorites = isMovie ? this.state.movieFavorites : this.state.tvFavorites;
    let updated = false;

    if (id in favorites) {
      delete favorites[id];
      updated = true;
    } else {
      const results = isMovie ? this.state.movieResults : this.state.tvResults;
      const found = results.find(results => results.id === id);

      if (found) {
        favorites[id] = found;
        updated = true;
      }
    }

    if (updated) {
      this.setState({
        favorites
      });

      localStorage.setItem(isMovie ? 'movieFavorites' : 'tvFavorites', JSON.stringify(favorites));
    }
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
    const favorites = {
      ...this.state.movieFavorites, 
      ...this.state.tvFavorites
    }
    
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        favorites={favorites}
        handleFavoriteClick={this.handleFavoriteClick}
        loading={loading}
        error={error}
        handleChange={this.handleChange}
      />
    );
  }
}

export default SearchContainer;
