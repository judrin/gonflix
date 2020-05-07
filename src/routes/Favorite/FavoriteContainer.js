import React, { Component } from 'react';
import FavoritePresenter from './FavoritePresenter';

class FavoriteContainer extends Component {
  state = {
    tvFavorites: {},
    movieFavorites: {},
    loading: true,
    error: null
  };

  componentDidMount() {
    let tvFavorites = localStorage.getItem('tvFavorites');
    let movieFavorites = localStorage.getItem('movieFavorites');
    tvFavorites = tvFavorites ? JSON.parse(tvFavorites) : {};
    movieFavorites = movieFavorites ? JSON.parse(movieFavorites) : {};

    this.setState({
      tvFavorites,
      movieFavorites,
      loading: false
    });
  }

  handleFavoriteClick = (event, id) => {
    event.preventDefault();
    const { movieFavorites, tvFavorites } = this.state;

    if (id in movieFavorites) {
      delete movieFavorites[id];

      this.setState({
        movieFavorites
      });

      localStorage.setItem('movieFavorites', JSON.stringify(movieFavorites));
    }

    if (id in tvFavorites) {
      delete tvFavorites[id];

      this.setState({
        tvFavorites
      });

      localStorage.setItem('tvFavorites', JSON.stringify(tvFavorites));
    }
  }


  render() {
    const { movieFavorites, tvFavorites, loading, error } = this.state;
    return (
      <FavoritePresenter
        movieFavorites={Object.values(movieFavorites)}
        tvFavorites={Object.values(tvFavorites)}
        handleFavoriteClick={this.handleFavoriteClick}
        loading={loading}
        error={error}
      />
    )
  }
}

export default FavoriteContainer;