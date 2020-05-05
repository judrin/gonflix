import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/Loader';
import HeadTitle from 'components/HeadTitle';
import Message from 'components/Message';

import { Scrollbars } from 'react-custom-scrollbars';

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
  margin-left: 20px;
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
  width: 50%;
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

const StyledScrollbars = styled(Scrollbars)`
  margin-top: 20px;
  
  > div {
    white-space: nowrap
  }
`

const TrackHorizontalScrollbar = styled.div`
  right: 2px;
  bottom: 2px;
  left: 2px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.58);
`

const ThumbHorizontalScrollbar = styled.div`
  background-color: rgba(52, 152, 219, 0.74);
  border: 1px solid #3498db;
  border-radius: 3px;
`

const Video = styled.div`
  width: 320px;
  margin-left: 20px;
  display: inline-block;

  :first-child {
    margin-left: 0;
  }
`

function DetailPresenter({ result, loading, error }) {
  const subDetails = [];

  if (!loading) {
    const releaseDate = result.release_date || result.first_air_date
    const runtime = result.runtime || result.episode_run_time[0];

    if (releaseDate) subDetails.push(releaseDate.substring(0, 4));
    if (runtime) subDetails.push(`${runtime} min`);
    if (result.genres) subDetails.push(result.genres.map(genre => genre.name).join(' / '))
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
                <StyledScrollbars
                  style={{ height: 195 }} 
                  renderTrackHorizontal={({ style, ...props }) => <TrackHorizontalScrollbar style={style} {...props} />}
                  renderThumbHorizontal={({ style, ...props }) => <ThumbHorizontalScrollbar style={style} {...props} />}
                >
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
                </StyledScrollbars>
              </VideoContainer>
            </Data>
          </Content>
          {error && <Message text={error} color="#e74c3c" />}
        </Container>
      ) : <Loader />}
    </>
  )
}

DetailPresenter.prototype = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
