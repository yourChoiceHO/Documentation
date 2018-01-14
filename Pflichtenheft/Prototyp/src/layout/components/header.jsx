import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Layout, Icon, Button, Menu, Dropdown } from 'antd';
import { prop, has } from 'ramda';

import getHumanizedGreeting from '../../helpers/get-humanized-greeting';
import getClassNames from '../../helpers/get-class-names';
import styles from './styles/header.module.less';

import Authentication from '../../services/authentication';

const { Header } = Layout;
const cx = getClassNames(styles);

class PageHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      user: null,
    };

    this.renderMenuOverlay = this.renderMenuOverlay.bind(this);
  }

  componentWillMount() {
    this.setState({
      authenticated: Authentication.isAuthenticated(),
      user: Authentication.getUser(),
    });
  }

  componentWillReceiveProps() {
    this.setState({
      authenticated: Authentication.isAuthenticated(),
      user: Authentication.getUser(),
    });
  }

  handleOnClick = ({ key }) => {
    if (key === 'logout') {
      Authentication.logout({ referrer: '/' });
    }
  };

  renderMenuOverlay() {
    return (
      <Menu onClick={this.handleOnClick}>
        <Menu.Item key="logout">Abmelden</Menu.Item>
      </Menu>
    );
  }

  render() {
    const { authenticated, user } = this.state;

    return (
      <Header className={cx('header')}>
        <Row>
          <Col offset={6} span={12}>
            <h1 className={cx('title')}>
              <Link className={cx('title-link')} to="/">
                <Icon type="check-square-o" /> <div className={cx('title-text')}>yourChoice</div>
              </Link>
            </h1>
          </Col>
          <Col span={6} className={cx('align-content-right')}>
            {authenticated && (
              <div className={cx('menu')}>
                {has('name', user) && (
                  <span>{`${getHumanizedGreeting(new Date())}, ${prop('name', user)}!`}</span>
                )}
                <Dropdown overlay={this.renderMenuOverlay()} placement="bottomRight">
                  <Button
                    className={cx('menu-button')}
                    icon="setting"
                    shape="circle"
                    type="default"
                    ghost
                  />
                </Dropdown>
              </div>
            )}
          </Col>
        </Row>
      </Header>
    );
  }
}
export default withRouter(PageHeader);
