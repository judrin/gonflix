import React, { Component } from 'react';
import HomePresenter from './HomePresenter';
import { movieApi } from 'api';

class HomeContainer extends Component {
  state = {
    nowPlaying: [],
    upcoming: [],
    popular: [],
    favorites: {},
    loading: true,
    error: null
  };

  componentDidMount() {
    let favorites = localStorage.getItem('movieFavorites');
    favorites = favorites ? JSON.parse(favorites) : {};

    Promise.all([
      movieApi.nowPlaying(),
      movieApi.upcoming(),
      movieApi.popular()
    ])
      .then(([nowPlayingResponse, upcomingResponse, popularResponse]) => {
        this.setState({
          nowPlaying: nowPlayingResponse.data.results,
          upcoming: upcomingResponse.data.results,
          popular: popularResponse.data.results,
          favorites,
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          error: "Can't find movies information.",
          loading: false
        })
      })
  }

  handleFavoriteClick = (event, id) => {
    event.preventDefault();
    const { favorites } = this.state;
    let updated = false;

    if (id in favorites) {
      delete favorites[id];
      updated = true;
    } else {
      const movies = [
        ...this.state.nowPlaying,
        ...this.state.upcoming,
        ...this.state.popular
      ];

      const found = movies.find(movie => movie.id === id);

      if (found) {
        favorites[id] = found;
        updated = true;
      }
    }

    if (updated) {
      this.setState({
        favorites
      });

      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    }
  }


  render() {
    const { nowPlaying, upcoming, popular, favorites, loading, error } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        favorites={favorites}
        handleFavoriteClick={this.handleFavoriteClick}
        loading={loading}
        error={error}
      />
    )
  }
}

export default HomeContainer;