import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/Loader';
import HeadTitle from 'components/HeadTitle';
import Message from 'components/Message';
import { Link, Route, withRouter } from 'react-router-dom';
import Tab from 'components/Tab';
import VideoContainer from 'routes/Video';
import SeasonsContainer from 'routes/Seasons';
import ProductionContainer from 'routes/Production';

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
  background: url(${(props) => props.bgImage}) center/cover no-repeat;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const Cover = styled.div`
  width: 30%;
  height: 41vw;
  background: url(${(props) => props.bgImage}) center/cover no-repeat;
  border-radius: 5px;

  @media (max-width: 767px) {
    width: 100%;
    height: 117vw;
    margin-bottom: 25px;
  }
`;

const Data = styled.div`
  width: 70%;
  margin-left: 28px;

  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  max-width: 640px;
`;

const Icon = styled.img`
  width: 40px;
  vertical-align: middle;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(53, 152, 219, 0.3);
  margin-top: 30px;
`;

function DetailPresenter({ location, match, result, loading, error }) {
  const { url, path } = match;
  const { pathname } = location;
  const isMovie = path.includes('/movie');
  const videos = result.videos ? result.videos.results : [];
  console.log(result);
  const seasons = result.seasons ? result.seasons : [];
  const releaseDate = result.release_date || result.first_air_date;
  const runtime =
    result.runtime || (result.episode_run_time && result.episode_run_time[0]);

  const subDetails = [];

  if (releaseDate) subDetails.push(releaseDate.substring(0, 4));
  if (runtime) subDetails.push(`${runtime} min`);
  if (result.genres && result.genres.length)
    subDetails.push(result.genres.map((genre) => genre.name).join(' / '));

  return (
    <>
      <HeadTitle
        title={
          loading ? 'Loading' : result.original_title || result.original_name
        }
      />
      {!loading ? (
        <Container>
          {result.backdrop_path ? (
            <Backdrop
              bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            />
          ) : null}
          <Content>
            <Cover
              bgImage={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                  : require('../../assets/not-available.png')
              }
            />
            <Data>
              <Title>{result.original_title || result.original_name}</Title>
              <ItemContainer>
                {subDetails.reduce((acc, curr, index) => [
                  acc,
                  <Divider key={`item-d-${index}`}>•</Divider>,
                  <Item key={`detail-${index}`}>{curr}</Item>,
                ])}
                {result.imdb_id ? (
                  <>
                    <Divider>•</Divider>
                    <Item>
                      <a
                        href={`https://www.imdb.com/title/${result.imdb_id}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Icon
                          src={require('../../assets/IMDb-logo.png')}
                          alt='IMDb'
                        />
                      </a>
                    </Item>
                  </>
                ) : null}
              </ItemContainer>
              <Overview>{result.overview}</Overview>
              <Tabs>
                <Link to={url}>
                  <Tab name='Videos' active={pathname === url} />
                </Link>
                <Link to={`${url}/production`}>
                  <Tab
                    name='Production'
                    active={pathname === `${url}/production`}
                  />
                </Link>
                {isMovie ? null : (
                  <Link to={`${url}/seasons`}>
                    <Tab
                      name='Seasons'
                      active={pathname === `${url}/seasons`}
                    />
                  </Link>
                )}
              </Tabs>
              <Route
                path={`${path}`}
                exact
                render={(props) => (
                  <VideoContainer {...props} videos={videos} />
                )}
              />
              <Route
                path={`${path}/production`}
                render={(props) => (
                  <ProductionContainer
                    {...props}
                    companies={result.production_companies}
                    countries={result.production_countries}
                  />
                )}
              />
              <Route
                path={`${path}/seasons`}
                render={(props) => (
                  <SeasonsContainer {...props} seasons={seasons} />
                )}
              />
            </Data>
          </Content>
          {error && <Message text={error} color='#e74c3c' />}
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
};

export default withRouter(DetailPresenter);
