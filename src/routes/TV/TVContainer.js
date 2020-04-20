import React, { Component } from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from 'api';

class TVContainer extends Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null
  }

  componentDidMount() {
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
    const { topRated, popular, airingToday, loading, error } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        loading={loading}
        error={error}
      />
    )
  }
}

export default TVContainer;