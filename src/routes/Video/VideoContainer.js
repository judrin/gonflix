import React from 'react';
import styled from 'styled-components';
import HorizontalScrollbar from 'components/HorizontalScrollbar';
import VideoPresenter from './VideoPresenter';

const Container = styled.div`
  margin-top: 30px;

  h4 {
    display: inline-block;
    font-size: 22px;
    border-bottom: 3px solid #3498db;
    padding: 5px;
  }
`;

function VideoContainer({ videos }) {
  return (
    <Container>
      <HorizontalScrollbar>
        {videos.map((video) => {
          const { id, key, name } = video;
          return <VideoPresenter key={id} videoKey={key} name={name} />;
        })}
      </HorizontalScrollbar>
    </Container>
  );
}

export default VideoContainer;
