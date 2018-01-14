import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Header from './components/header';
import Content from './components/content';

const DefaultLayout = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Layout>
      <Header />
      <Content>{children}</Content>
    </Layout>
  </Layout>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
