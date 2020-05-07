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

const Bar = styled.div`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

function SearchPresenter({
  movieResults,
  tvResults,
  searchTerm,
  favorites,
  handleFavoriteClick,
  loading,
  error,
  handleChange
}) {
  return (
    <Container>
      <HeadTitle title="Search" />
      <Bar>
        <Input
          placeholder="Search Movies or TV Shows..."
          value={searchTerm}
          onChange={handleChange}
        />
      </Bar>
      {!loading ? (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map(movie => (
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
          {tvResults && tvResults.length > 0 && (
            <Section title="TV Show Results">
              {tvResults.map(show => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imgUrl={show.poster_path}
                  rating={show.vote_average}
                  year={show.first_air_date && show.first_air_date.substring(0, 4)}
                  isFavorite={show.id in favorites}
                  handleFavoriteClick={handleFavoriteClick}
                />
              ))}
            </Section>
          )}
        </>
      ): <Loader />}
      {error && <Message text={error} color="#e74c3c" />}
      {tvResults && movieResults && !tvResults.length && !movieResults.length && (
        <Message text="Nothing found" color="#95a5a6" />
      )}
    </Container>
  );
}

SearchPresenter.prototype = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleFavoriteClick: PropTypes.func.isRequired,
  handleChange:PropTypes.func.isRequired,
  favorites: PropTypes.object
};

export default SearchPresenter;
