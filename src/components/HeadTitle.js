import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

function HeadTitle({ title }) {
  return (
    <Helmet>
      <title>{title} | Gonflix</title>
    </Helmet>
  )
}

HeadTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default HeadTitle;