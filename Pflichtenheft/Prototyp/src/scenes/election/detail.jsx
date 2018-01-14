import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Switch, Redirect, Link } from 'react-router-dom';

import ElectionEditPage from '../../scenes/election/edit';
import ElectionRemovePage from '../../scenes/election/remove';
import ElectionEvaluatePage from '../../scenes/election/evaluate';

import RouteWithProps from '../../components/RouteWithProps';

import getClassNames from '../../helpers/get-class-names';
import styles from './styles/election.module.less';

const cx = getClassNames(styles);

const ElectionDetailPage = ({ match, election }) =>
  (match.isExact ? (
    <Fragment>
      <div className={cx('actions')}>
        <div className={cx(['action', 'action--left'])}>
          <Button type="default">
            <Link to="/">Zurück zur Übersicht</Link>
          </Button>
        </div>
        <div className={cx(['action', 'action--right'])}>
          <Button type="primary">
            <Link to={`${match.url}/bearbeiten`}>Bearbeiten</Link>
          </Button>
        </div>
        <div className={cx(['action', 'action--right'])}>
          <Button type="danger">
            <Link to={`${match.url}/löschen`}>Löschen</Link>
          </Button>
        </div>
      </div>
    </Fragment>
  ) : (
    <Switch>
      <RouteWithProps
        path="/wahlleiter/wahl/:id/bearbeiten"
        props={{ election }}
        component={ElectionEditPage}
      />
      <RouteWithProps
        path="/wahlleiter/wahl/:id/löschen"
        props={{ election }}
        component={ElectionRemovePage}
      />
      <RouteWithProps
        path="/wahlleiter/wahl/:id/auswerten"
        props={{ election }}
        component={ElectionEvaluatePage}
      />
      <RouteWithProps
        path="/moderator/wahl/:id/bearbeiten"
        props={{ election }}
        component={ElectionEditPage}
      />
      <RouteWithProps
        path="/moderator/wahl/:id/löschen"
        props={{ election }}
        component={ElectionRemovePage}
      />
      <Redirect to={match.url} />
    </Switch>
  ));

ElectionDetailPage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default ElectionDetailPage;
