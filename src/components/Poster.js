import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

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

const Favorite = styled(FaHeart)`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 18px;
  opacity: ${props => props.isFavorite ? 1 : 0};
  color: ${props => props.isFavorite ? '#3498db' : 'white'};
  transition: opacity .15s linear, color .15s linear;

  &:hover {
    color: #3498db;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Favorite},
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

function Poster({ id, imgUrl, title, rating, year, isFavorite, handleFavoriteClick, isMovie = false }) {
  const bgUrl = imgUrl ? `https://image.tmdb.org/t/p/w300${imgUrl}` : require('../assets/not-available.png');

  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container>
        <ImageContainer>
          <Image bgUrl={bgUrl} />
          <Favorite
            isFavorite={isFavorite}
            onClick={(event) => handleFavoriteClick(event, id, isMovie)} 
          />
          <Rating>
            <span role="img" aria-label="rating">
              ⭐
            </span>
            {rating}/10
          </Rating>
        </ImageContainer>
        <Title>
          {title.length > 18 ? `${title.substring(0, 18)}...` : title}
        </Title>
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
  year: PropTypes.string,
  isFavorite: PropTypes.bool,
  handleFavoriteClick: PropTypes.func.isRequired
}

export default Poster;