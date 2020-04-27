import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/Loader';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${props => props.bgImage}) center/cover no-repeat;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%; 
  height: 100%;
  background: url(${props => props.bgImage}) center/cover no-repeat;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

function DetailPresenter({ result, loading, error }) {
  return (
    <React.Fragment>
      <Helmet>
        <title>{loading ? 'Loading' : result.original_title || result.original_name} | Gonflix</title>
      </Helmet>
      {loading
        ? (
          <Loader />
        )
        : (
          <Container>
            <Backdrop
              bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            />
            <Content>
              <Cover
                bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require('../../assets/not-available.png')}
              />
              <Data>
                <Title>
                  {result.original_title || result.original_name}
                </Title>
                <ItemContainer>
                  <Item>
                    {result.release_date
                      ? result.release_date.substring(0, 4)
                      : result.first_air_date.substring(0, 4)}
                  </Item>
                  <Divider>•</Divider>
                  <Item>
                    {result.runtime || result.episode_run_time[0]} min
                  </Item>
                  <Divider>•</Divider>
                  <Item>
                    {result.genres && result.genres.map((genre, index) =>
                      index === result.genres.length - 1
                        ? genre.name
                        : `${genre.name} / `)}
                  </Item>
                </ItemContainer>
                <Overview>{result.overview}</Overview>
              </Data>
            </Content>
          </Container>
        )}
    </React.Fragment>
  )
}

DetailPresenter.prototype = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
