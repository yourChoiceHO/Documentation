import React, { Component } from 'react';
import { Route } from 'react-router';
import nprogress from 'nprogress';

import './styles/loading-route.less';

nprogress.configure({
  showSpinner: false,
  trickleSpeed: 50,
  easing: 'ease',
  speed: 200,
});

class LoadingRoute extends Component {
  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    return <Route {...this.props} />;
  }
}

export default LoadingRoute;
