import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import Loader from 'components/Loader';
import Section from 'components/Section';
import Message from 'components/Message';
import Poster from 'components/Poster';

const Container = styled.div`
  padding: 20px;
`;

function TVPresenter({ topRated, popular, airingToday, loading, error }) {
  return (
    <React.Fragment>
      <Helmet>
        <title>TV | Gonflix</title>
      </Helmet>
      {loading
        ? (
          <Loader />
        )
        : (
          <Container>
            {topRated && topRated.length > 0 && (
              <Section title="Top Rated Shows">
                {topRated.map(show => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    title={show.original_name}
                    imgUrl={show.poster_path}
                    rating={show.vote_average}
                    year={show.first_air_date.substring(0, 4)}
                  />
                ))}
              </Section>
            )}
            {popular && popular.length > 0 && (
              <Section title="Upcoming shows">
                {popular.map(show => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    title={show.original_name}
                    imgUrl={show.poster_path}
                    rating={show.vote_average}
                    year={show.first_air_date.substring(0, 4)}
                  />
                ))}
              </Section>
            )}
            {airingToday && airingToday.length > 0 && (
              <Section title="Airing Today">
                {airingToday.map(show => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    title={show.original_name}
                    imgUrl={show.poster_path}
                    rating={show.vote_average}
                    year={show.first_air_date.substring(0, 4)}
                  />
                ))}
              </Section>
            )}
            {error && <Message text={error} color="#e74c3c" />}
          </Container>
        )};
    </React.Fragment>
  )
}

TVPresenter.prototype = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

export default TVPresenter;