import React, { Component } from 'react';
import HomePresenter from './HomePresenter';
import { movieApi } from 'api';

class HomeContainer extends Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    loading: true,
    error: null
  };

  componentDidMount() {
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


  render() {
    const { nowPlaying, upcoming, popular, loading, error } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        loading={loading}
        error={error}
      />
    )
  }
}

export default HomeContainer;