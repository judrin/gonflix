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

function FavoritePresenter({ movieFavorites, tvFavorites, loading, handleFavoriteClick, error }) {
  return (
    <>
      <HeadTitle title="Favorites" />
      {!loading ? (
        <Container>
          {movieFavorites.length > 0 && (
            <Section title="Favorites - Movies">
              {movieFavorites.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imgUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={movie.release_date && movie.release_date.substring(0, 4)}
                  isFavorite
                  handleFavoriteClick={handleFavoriteClick}
                  isMovie
                />
              ))}
            </Section>
          )}
          {tvFavorites.length > 0 && (
            <Section title="Favorites - TV">
              {tvFavorites.map(show => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imgUrl={show.poster_path}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                  isFavorite
                  handleFavoriteClick={handleFavoriteClick}
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

FavoritePresenter.prototype = {
  movieFavorites: PropTypes.array,
  tvFavorites: PropTypes.array,
  handleFavoriteClick: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default FavoritePresenter;
