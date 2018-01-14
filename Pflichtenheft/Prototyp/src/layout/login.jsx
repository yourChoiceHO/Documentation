import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Header from './components/header';
import Footer from './components/footer';

const { Content } = Layout;

const LoginLayout = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Layout>
      <Header />
      <Content style={{ display: 'flex', flexFlow: 'column wrap' }}>
        <div
          style={{
            width: '100%',
            alignSelf: 'center',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
        <Footer />
      </Content>
    </Layout>
  </Layout>
);

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
