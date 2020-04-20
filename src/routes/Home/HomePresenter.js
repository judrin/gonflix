import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loader from 'components/Loader';
import Section from 'components/Section';
import Message from 'components/Message';
import Poster from 'components/Poster';

const Container = styled.div`
  padding: 20px;
`;

function HomePresenter({ nowPlaying, popular, upcoming, loading, error }) {
  return loading
    ? (
      <Loader />
    )
    : (
      <Container>
        {nowPlaying && nowPlaying.length > 0 && (
          <Section title="Now Playing">
            {nowPlaying.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                imgUrl={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie
              />
            ))}
          </Section>
        )}
        {upcoming && upcoming.length > 0 && (
          <Section title="Popular Movies">
            {upcoming.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                imgUrl={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Upcoming Movies">
            {popular.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                imgUrl={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie
              />
            ))}
          </Section>
        )}
        {error && <Message text={error} color="#e74c3c" />}
      </Container>
    );
}

HomePresenter.prototype = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  airngToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default HomePresenter;
