import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { isEmpty } from 'ramda';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

import getClassNames from '../../helpers/get-class-names';
import styles from './styles/election.module.less';

const cx = getClassNames(styles);

const ElectionEvaluatePage = ({ match, election, ...props }) => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Dataset #1',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 20, 81, 56, 55, 40],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            color: 'rgba(255,99,132,0.2)',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  if (isEmpty(election)) {
    return <h3>Fehler</h3>;
  }

  return (
    <div>
      <div className={cx('actions')}>
        <div className={cx(['action', 'action--left'])}>
          <Button type="default">
            <Link to="/">Zurück zur Übersicht</Link>
          </Button>
        </div>
        <div className={cx(['action', 'action--right'])}>
          <Button type="primary">Auswertung exportieren</Button>
        </div>
      </div>
      <h3>{election.type}</h3>
      <p>
        {`Datum: ${moment(election.startTime).format('DD.MM.YYYY')} - ${moment(election.endTime).format('DD.MM.YYYY')}`}
      </p>
      <div
        style={{
          height: '80%',
          width: '100%',
          margin: 'auto',
          position: 'relative',
        }}
      >
        <Bar data={chartData} options={chartOptions} width={600} height={250} />
      </div>
    </div>
  );
};

ElectionEvaluatePage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default ElectionEvaluatePage;
