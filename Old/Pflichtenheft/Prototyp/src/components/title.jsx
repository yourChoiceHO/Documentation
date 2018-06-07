import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { isEmpty, join } from 'ramda';

const Title = ({ text, base, separator }) => (
  <Helmet>
    <title>{isEmpty(text) ? base : join(' ', [text, separator, base])}</title>
  </Helmet>
);

Title.propTypes = {
  text: PropTypes.string,
  base: PropTypes.string,
  separator: PropTypes.string,
};

Title.defaultProps = {
  text: '',
  base: 'yourChoice',
  separator: '·',
};

export default Title;
