import React, { Component } from 'react';
import DetailPresenter from './DetailPresenter';
import { movieApi, tvApi } from 'api';
import Loader from 'components/Loader';

class DetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: props.location.pathname.includes('/movie/'),
    };
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    const detailApi = this.state.isMovie
      ? movieApi.movieDetail
      : tvApi.showDetail;

    if (isNaN(id)) {
      this.props.history.push('/');
    }

    detailApi(id)
      .then((response) => {
        this.setState({
          result: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: "Can't find anything.",
          loading: false,
        });
      });
  }

  render() {
    const { result, loading, error } = this.state;
    return loading ? (
      <Loader />
    ) : (
      <DetailPresenter result={result} error={error} />
    );
  }
}

export default DetailContainer;
