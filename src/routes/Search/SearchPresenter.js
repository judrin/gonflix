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

const Form = styled.form`
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
  loading,
  error,
  handleSubmit,
  updateTerm
}) {
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows..."
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {loading
        ? (
          <Loader />
        )
        : (
          <React.Fragment>
            {movieResults && movieResults.length > 0 && (
              <Section title="Movie Results">
                {movieResults.map(movie => (
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
            {tvResults && tvResults.length > 0 && (
              <Section title="TV Show Results">
                {tvResults.map(show => (
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
          </React.Fragment>
        )}
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
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;
