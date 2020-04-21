import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background: url(${props => props.bgUrl}) center/cover no-repeat;
  height: 180px;
  border-radius: 3px;
  transition: opacity .15s linear;
`;

const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity .15s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

function Poster({ id, imgUrl, title, rating, year, isMovie = false }) {
  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container>
        <ImageContainer>
          <Image bgUrl={imgUrl ? `https://image.tmdb.org/t/p/w300${imgUrl}` : require('../assets/not-available.png')} />
          <Rating>
            <span role="img" aria-label="rating">
              ⭐
            </span>
            {rating}/10
        </Rating>
        </ImageContainer>
        <Title>{title.length > 18 ? `${title.substring(0, 18)}...` : title}</Title>
        <Year>{year}</Year>
      </Container>
    </Link>
  )
}

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string
}

export default Poster;