import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/Loader';
import HeadTitle from 'components/HeadTitle';
import Message from 'components/Message';
import HorizontalScrollbar from 'components/HorizontalScrollbar';
import Season from 'components/Season';

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

  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const Cover = styled.div`
  width: 30%; 
  height: 41vw;
  background: url(${props => props.bgImage}) center/cover no-repeat;
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

const VideoContainer = styled.div`
  margin-top: 30px;

  h4 {
    display: inline-block;
    font-size: 22px;
    border-bottom: 3px solid #3498db;
    padding: 5px;
  }
`;

const Video = styled.div`
  width: 320px;
  margin-left: 20px;
  display: inline-block;

  :first-child {
    margin-left: 0;
  }

  @media (max-width: 419px) {
    width: 280px;

    > iframe {
      height: 158px;
    }
  }
`

const SeasonContainer = styled.div`
  margin-top: 50px;
`

function DetailPresenter({ result, loading, error }) {
  const subDetails = [];

  if (!loading) {
    const releaseDate = result.release_date || result.first_air_date
    const runtime = result.runtime || (result.episode_run_time && result.episode_run_time[0]);

    if (releaseDate) subDetails.push(releaseDate.substring(0, 4));
    if (runtime) subDetails.push(`${runtime} min`);
    if (result.genres && result.genres.length) subDetails.push(result.genres.map(genre => genre.name).join(' / '))
  }

  return (
    <>
      <HeadTitle title={loading ? 'Loading' : result.original_title || result.original_name} />
      {!loading ? (
        <Container>
          {result.backdrop_path ? (
            <Backdrop
              bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            />
          ): null}
          <Content>
            <Cover
              bgImage={result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require('../../assets/not-available.png')}
            />
            <Data>
              <Title>
                {result.original_title || result.original_name}
              </Title>
              <ItemContainer>
                {subDetails.reduce((acc, curr, index) => 
                  [acc, <Divider key={`item-d-${index}`}>•</Divider>, <Item key={`detail-${index}`}>{curr}</Item>])
                }
                {result.imdb_id ? (
                  <>
                    <Divider>•</Divider>
                    <Item>
                      <a
                        href={`https://www.imdb.com/title/${result.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Icon
                          src={require('../../assets/IMDb-logo.png')}
                          alt="IMDb"
                        />
                      </a>
                    </Item>
                  </>
                ) : null}
              </ItemContainer>
              <Overview>{result.overview}</Overview>
              <VideoContainer>
                <h4>Trailer</h4>
                <HorizontalScrollbar>
                  {result.videos && result.videos.results.map(video => (
                    <Video key={video.id}>
                      <iframe
                        src={`https://www.youtube.com/embed/${video.key}`}
                        width="100%"
                        height="180px"
                        title={video.name}
                      />
                    </Video>
                  ))}
                </HorizontalScrollbar>
              </VideoContainer>
              <SeasonContainer>
                {result.seasons && result.seasons.map(season => (
                  <Season
                    key={season.id}
                    imgUrl={season.poster_path}
                    name={season.name}
                    year={season.air_date && season.air_date.substring(0, 4)} 
                    epCount={season.episode_count} 
                    overview={season.overview}
                  />
                ))}
              </SeasonContainer>
            </Data>
          </Content>
          {error && <Message text={error} color="#e74c3c" />}
        </Container>
      ) : <Loader />}
    </>
  )
}

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
