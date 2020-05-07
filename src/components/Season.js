import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.22);

  :last-child {
    margin-bottom: 0;
  }

  @media (max-width: 419px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Image = styled.div`
  flex: 0 0 125px;
  height: 180px;
  background: url(${props => props.bgImage}) rgba(0, 0, 0, 0.68) center/cover no-repeat;
  border-radius: 3px;
`

const DetailContainer = styled.div`
  width: 100%;
  margin-left: 15px;
`

const Info = styled.span`
  display: block;
  font-size: 18px;
  margin-bottom: 10px;

  @media (max-width: 419px) {
    text-align: center;
    margin-top: 10px;
  }
`

const EpisodeCount = styled.span`
  display: block;
  margin-bottom: 10px;

  @media (max-width: 419px) {
    text-align: center;
  }
`

const SeasonOverview = styled.span`
  display: block;
  opacity: 0.7;
  line-height: 1.5;
`

function Season({ imgUrl, name, year, epCount, overview }) {
  const bgUrl = imgUrl ? `https://image.tmdb.org/t/p/w300${imgUrl}` : require('../assets/not-available.png');
  return (
    <Container>
      <Image bgImage={bgUrl} />
      <DetailContainer>
        <Info>
          {name} {year && `(${year})`}
        </Info>
        <EpisodeCount>
          {epCount} Episodes
        </EpisodeCount>
        <SeasonOverview>
          {overview}
        </SeasonOverview>
      </DetailContainer>
    </Container>
  )
};

Season.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.string,
  epCount: PropTypes.number,
  overview: PropTypes.string
}

export default Season;
