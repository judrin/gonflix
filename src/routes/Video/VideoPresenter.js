import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
`;

function VideoPresenter({ videoKey, name }) {
  return (
    <Video>
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}`}
        width='100%'
        height='180px'
        title={name}
      />
    </Video>
  );
}

VideoPresenter.prototype = {
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default VideoPresenter;
