import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeadTitle from 'components/HeadTitle';

import Loader from 'components/Loader';
import Section from 'components/Section';
import Message from 'components/Message';
import Poster from 'components/Poster';

const Container = styled.div`
  padding: 20px;
`;

function HomePresenter({ nowPlaying, popular, upcoming, loading, favorites, handleFavoriteClick, error }) {
  return (
    <>
      <HeadTitle title="Movies" />
      {!loading ? (
        <Container>
          {nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imgUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={movie.release_date && movie.release_date.substring(0, 4)}
                  isFavorite={movie.id in favorites}
                  handleFavoriteClick={handleFavoriteClick}
                  isMovie
                />
              ))}
            </Section>
          )}
          {upcoming.length > 0 && (
            <Section title="Popular Movies">
              {upcoming.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imgUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={movie.release_date && movie.release_date.substring(0, 4)}
                  isFavorite={movie.id in favorites}
                  handleFavoriteClick={handleFavoriteClick}
                  isMovie
                />
              ))}
            </Section>
          )}
          {popular.length > 0 && (
            <Section title="Upcoming Movies">
              {popular.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imgUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={movie.release_date && movie.release_date.substring(0, 4)}
                  isFavorite={movie.id in favorites}
                  handleFavoriteClick={handleFavoriteClick}
                  isMovie
                />
              ))}
            </Section>
          )}
          {error && <Message text={error} color="#e74c3c" />}
        </Container>
      ): <Loader />}
    </>
  )
}

HomePresenter.prototype = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  airngToday: PropTypes.array,
  favorites: PropTypes.object,
  handleFavoriteClick: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default HomePresenter;
