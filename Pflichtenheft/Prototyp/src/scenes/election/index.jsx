import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, Switch } from 'react-router-dom';
import { List, Alert, Button } from 'antd';
import moment from 'moment';
import { pathOr, isEmpty } from 'ramda';

import LoadingRoute from '../../components/LoadingRoute';

import fetch from '../../lib/api/fake';

import ElectionVotePage from '../../scenes/election/vote';
import ElectionDetailPage from '../../scenes/election/detail';

import Authentication from '../../services/authentication';
import { isVoter, isSupervisor, isModerator } from '../../services/user';

import getClassNames from '../../helpers/get-class-names';
import styles from './styles/election.module.less';

const cx = getClassNames(styles);

class ElectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      elections: [],
      error: null,
      role: '',
    };

    this.fetchElections = this.fetchElections.bind(this);
  }

  componentWillMount() {
    const role = Authentication.getRole();
    this.setState({ role });
  }

  componentDidMount() {
    this.fetchElections();
  }

  componentWillUnmount() {
    this.cancel('Unmounting component.');
  }

  getElectionActions = (election) => {
    const { role } = this.state;
    const { match } = this.props;
    const { path } = match;
    const { id } = election;

    const pathname = `${path}/${id}`;

    let actions = [];

    if (isVoter(role)) {
      actions = [<Link to={pathname}>Teilnehmen</Link>];
    } else if (isSupervisor(role)) {
      actions = [
        <Link to={pathname}>Details</Link>,
        <Link to={`${pathname}/bearbeiten`}>Bearbeiten</Link>,
        <Link to={`${pathname}/löschen`}>Löschen</Link>,
        <Link to={`${pathname}/auswerten`}>Auswerten</Link>,
      ];
    } else if (isModerator(role)) {
      actions = [
        <Link to={pathname}>Details</Link>,
        <Link to={`${pathname}/bearbeiten`}>Bearbeiten</Link>,
        <Link to={`${pathname}/löschen`}>Löschen</Link>,
      ];
    }

    return actions;
  };

  getElectionMeta(election) {
    const { role } = this.state;
    const { type } = election;
    let notice = '';

    if (isSupervisor(role) || isModerator(role)) {
      notice = <Alert message="von Moderator bearbeitet" type="warning" showIcon />;
    }

    return <List.Item.Meta title={type} description={notice} />;
  }

  fetchElections() {
    this.setState({ loading: true, error: null, elections: [] });

    this.cancel = fetch({ url: '/elections', method: 'get' }).fork(
      (error) => {
        this.setState({ error, loading: false, elections: [] });
      },
      (elections) => {
        this.setState({ elections, loading: false, error: null });
      }
    );
  }

  render() {
    const { elections, loading, error, role } = this.state;
    const { match } = this.props;

    const pagination = isEmpty(elections)
      ? {}
      : {
        pageSize: 10,
        current: 1,
        total: elections.length,
        onChange: () => {},
      };

    if (error) {
      console.error(error);
    }

    return (loading && !match.isExact) || match.isExact ? (
      <Fragment>
        <div className={cx('actions')}>
          <div className={cx(['action', 'action--left'])}>
            <Button type="primary" loading={loading} onClick={() => this.fetchElections()}>
              Aktualisieren
            </Button>
          </div>
          <div className={cx(['action', 'action--right'])}>
            {(isSupervisor(role) || isModerator(role)) && (
              <Button type="primary">
                <Link to={`${match.url}/neu`}>Neue Wahl anlegen</Link>
              </Button>
            )}
          </div>
        </div>
        {loading && <div className={cx('empty-text')}>Laden...</div>}
        {!loading &&
          isEmpty(elections) && <div className={cx('empty-text')}>Keine Einträge gefunden</div>}
        {!loading &&
          !isEmpty(elections) && (
            <List
              style={{ minHeight: '100%' }}
              size="large"
              pagination={pagination}
              dataSource={elections}
              renderItem={election => (
                <List.Item key={election.id} actions={this.getElectionActions(election)}>
                  {this.getElectionMeta(election)}
                  <List size="small" bordered>
                    <List.Item>
                      {`Datum: ${moment(election.startTime).format('DD.MM.YYYY')} - ${moment(election.endTime).format('DD.MM.YYYY')}`}
                    </List.Item>
                    <List.Item>
                      {`Uhrzeit: ${moment(election.startTime).format('HH.mm')} Uhr - ${moment(election.endTime).format('HH.mm')} Uhr`}
                    </List.Item>
                    <List.Item>{`Status: ${election.state}`}</List.Item>
                  </List>
                </List.Item>
              )}
            />
          )}
      </Fragment>
    ) : (
      <Switch>
        <LoadingRoute
          path="/waehler/wahl/:id"
          render={(props) => {
            const id = pathOr('', ['match', 'params', 'id'], props);
            const election = pathOr({}, id, elections);

            if (isEmpty(election) && !loading) {
              return <Redirect to={match.url} />;
            }

            return <ElectionVotePage {...props} election={election} />;
          }}
        />
        <LoadingRoute
          path="/(wahlleiter|moderator)/wahl/:id"
          render={(props) => {
            const id = pathOr('', ['match', 'params', 'id'], props);
            const election = pathOr({}, id, elections);

            if (isEmpty(election) && !loading) {
              return <Redirect to={match.url} />;
            }

            return <ElectionDetailPage {...props} election={election} />;
          }}
        />
      </Switch>
    );
  }
}

ElectionPage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default ElectionPage;
