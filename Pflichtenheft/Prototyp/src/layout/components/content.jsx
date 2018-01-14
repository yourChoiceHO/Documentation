import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';

import Footer from './footer';

import getClassNames from '../../helpers/get-class-names';
import styles from './styles/content.module.less';

const { Content } = Layout;
const cx = getClassNames(styles);

const PageContent = ({ children }) => (
  <Content className={cx('content')}>
    <Layout className={cx('card')}>{children}</Layout>
    <Footer />
  </Content>
);

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(PageContent);
