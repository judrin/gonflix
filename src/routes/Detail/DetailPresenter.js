import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function DetailPresenter({ result, loading, error }) {
  return null;
}

DetailPresenter.prototype = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
