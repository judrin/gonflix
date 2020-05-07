import React, { Component } from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from 'api';

class TVContainer extends Component {
  state = {
    topRated: [],
    popular: [],
    airingToday: [],
    favorites: {},
    loading: true,
    error: null
  }

  componentDidMount() {
    let favorites = localStorage.getItem('tvFavorites');
    favorites = favorites ? JSON.parse(favorites) : {};

    Promise.all([
      tvApi.topRated(),
      tvApi.popular(),
      tvApi.airingToday()
    ])
      .then(([topRatedResponse, popularResponse, airingTodayResponse]) => {
        this.setState({
          topRated: topRatedResponse.data.results,
          popular: popularResponse.data.results,
          airingToday: airingTodayResponse.data.results,
          favorites,
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

  handleFavoriteClick = (event, id) => {
    event.preventDefault();
    const { favorites } = this.state;
    let updated = false;

    if (id in favorites) {
      delete favorites[id];
      updated = true;
    } else {
      const shows = [
        ...this.state.topRated,
        ...this.state.popular,
        ...this.state.airingToday
      ];

      const found = shows.find(show => show.id === id);

      if (found) {
        favorites[id] = found;
        updated = true;
      }
    }

    if (updated) {
      this.setState({
        favorites
      });

      localStorage.setItem('tvFavorites', JSON.stringify(favorites));
    }
  }

  render() {
    const { topRated, popular, airingToday, favorites, loading, error } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        favorites={favorites}
        handleFavoriteClick={this.handleFavoriteClick}
        loading={loading}
        error={error}
      />
    )
  }
}

export default TVContainer;