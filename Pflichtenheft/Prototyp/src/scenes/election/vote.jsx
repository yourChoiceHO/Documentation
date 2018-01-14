import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Radio, Col, Row, Modal, message } from 'antd';
import { isNil, map, addIndex } from 'ramda';
import moment from 'moment';

import getClassNames from '../../helpers/get-class-names';
import styles from './styles/election.module.less';

const cx = getClassNames(styles);

const RadioGroup = Radio.Group;

class ElectionVote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstVote: null,
      secondVote: null,
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleFirstVote = this.handleFirstVote.bind(this);
    this.handleSecondVote = this.handleSecondVote.bind(this);
  }

  handleConfirm() {
    const ref = Modal.confirm({
      title: 'Stimmabgabe bestätigen',
      content: 'Sind Sie sicher, dass Sie diese Stimme abgeben möchten?',
      okText: 'Bestätigen',
      cancelText: 'Abbrechen',
      onOk: () => {
        message.success('Stimme wurde erfolgreich abgegeben', 1.5, () => {
          this.props.history.push('/');
        });
      },
      onCancel: () => {
        ref.destroy();
      },
    });
  }

  handleFirstVote(event) {
    this.setState({ firstVote: event.target.value });
  }

  handleSecondVote(event) {
    this.setState({ secondVote: event.target.value });
  }

  render() {
    const { election } = this.props;
    const { firstVote, secondVote } = this.state;

    const radioStyle = {
      display: 'block',
    };

    const radioGroupStyle = {
      width: '100%',
    };

    const representatives = [
      {
        title: 'Dr.',
        firstname: 'Wolfang',
        lastname: 'Schäuble',
        profession: 'Bundesminister / MdB',
        locality: 'Offenburg',
        party: 'CDU',
      },
      {
        title: '',
        firstname: 'Elvira',
        lastname: 'Drobinski-Weiß',
        profession: 'Bundestagsabgeordnete',
        locality: 'Waldkirch',
        party: 'SPD',
      },
      {
        title: '',
        firstname: 'Norbert',
        lastname: 'Großklaus',
        profession: 'Evangelischer Pfarrer',
        locality: 'Offenburg',
        party: 'GRUENE',
      },
      {
        title: 'Dr.',
        firstname: 'Stephani',
        lastname: 'Trutz-Ulrich',
        profession: 'Chemiker',
        locality: 'Ortenberg',
        party: 'FDP',
      },
      {
        title: '',
        firstname: 'Tara',
        lastname: 'Maygutiak',
        profession: 'Arbeiter',
        locality: 'Offenburg',
        party: 'AFD',
      },
      {
        title: '',
        firstname: 'Karin',
        lastname: 'Binder',
        profession: 'Gewerkschaftssekretärin / MdB',
        locality: 'Karlsruhe',
        party: 'LINKE',
      },
    ];

    const parties = {
      CDU: { id: 'CDU', abbreviation: 'CDU', name: 'Christlich Demokratische Union Deutschlands' },
      SPD: { id: 'SPD', abbreviation: 'SPD', name: 'Sozialdemokratische Partei Deutschlands' },
      GRUENE: { id: 'GRUENE', abbreviation: 'GRÜNE', name: 'BÜNDNIS 90/DIE GRÜNEN' },
      FDP: { id: 'FDP', abbreviation: 'FDP', name: 'Freie Demokratische Partei' },
      AFD: { id: 'AFD', abbreviation: 'AfD', name: 'Alternative für Deutschland' },
      LINKE: { id: 'LINKE', abbreviation: 'DIE LINKE', name: 'DIE LINKE' },
      PIRATEN: { id: 'PIRATEN', abbreviation: 'PIRATEN', name: 'Piratenpartei Deutschland' },
      NPD: { id: 'NPD', abbreviation: 'NPD', name: 'Nationaldemokratische Partei Deutschlands' },
      TIER: {
        id: 'TIER',
        abbreviation: 'Tierschutzpartei',
        name: 'PARTEI MENSCH UMWELT TIERSCHUTZ',
      },
      FREIE: { id: 'FREIE', abbreviation: 'FREIE WÄHLER', name: 'FREIE WÄHLER' },
      OEDP: {
        id: 'OEDP',
        abbreviation: 'ÖDP',
        name: 'Ökologisch-Demokratische Partei / Familie und Umwelt',
      },
      MLPD: {
        id: 'MLPD',
        abbreviation: 'MLPD',
        name: 'Marxistisch-Leninistische Partei Deutschlands',
      },
    };

    const partiesOrder = [
      'CDU',
      'SPD',
      'GRUENE',
      'FDP',
      'AFD',
      'LINKE',
      'PIRATEN',
      'NPD',
      'TIER',
      'FREIE',
      'OEDP',
      'MLPD',
    ];

    return (
      <Fragment>
        <h2>
          Stimme zur {election.type} {moment(election.startTime).format('YYYY')} abgeben
        </h2>
        <div className={cx('actions')}>
          <div className={cx(['action', 'action--left'])}>
            <Button type="default">
              <Link to="/">Zurück zur Übersicht</Link>
            </Button>
          </div>
          <div className={cx(['action', 'action--right'])}>
            <Button
              type="primary"
              disabled={isNil(firstVote) || isNil(secondVote)}
              onClick={this.handleConfirm}
            >
              Stimme abgeben
            </Button>
          </div>
        </div>
        <Row>
          <Col span={12}>
            <RadioGroup
              name="first_vote"
              defaultValue={firstVote}
              onChange={this.handleFirstVote}
              style={radioGroupStyle}
            >
              {representatives.map((representative, index) => (
                <Row key={`first_vote_${index}`}>
                  <Col span={2}>{index}</Col>
                  <Col span={16}>
                    <h3>
                      {representative.title} {representative.lastname}, {representative.firstname}
                    </h3>
                    <Row>
                      <Col span={8}>
                        <p>{representative.profession}</p>
                        <p>{representative.locality}</p>
                      </Col>
                      <Col span={8}>{parties[representative.party].abbreviation}</Col>
                      <Col span={8}>{parties[representative.party].name}</Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Radio style={radioStyle} value={index} />
                  </Col>
                </Row>
              ))}
            </RadioGroup>
          </Col>
          <Col span={12}>
            <RadioGroup
              name="second_vote"
              defaultValue={secondVote}
              onChange={this.handleSecondVote}
              style={radioGroupStyle}
            >
              {addIndex(map)((key, index) => {
                const party = parties[key];
                return (
                  <Row key={`second_vote_${index}`}>
                    <Col span={2}>{index}</Col>
                    <Col span={16}>
                      <Row>
                        <Col span={12}>
                          <h3>{party.abbreviation}</h3>
                        </Col>
                        <Col span={12}>
                          <h4>{party.name}</h4>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={6}>
                      <Radio style={radioStyle} value={key} />
                    </Col>
                  </Row>
                );
              }, partiesOrder)}
            </RadioGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default ElectionVote;
