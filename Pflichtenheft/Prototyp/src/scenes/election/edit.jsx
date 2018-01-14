import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import getClassNames from '../../helpers/get-class-names';
import styles from './styles/election.module.less';

const cx = getClassNames(styles);

const ElectionEditPage = props => (
  <div className={cx('actions')}>
    <div className={cx(['action', 'action--left'])}>
      <Button type="default">
        <Link to="/">Zurück zur Übersicht</Link>
      </Button>
    </div>
    <div className={cx(['action', 'action--right'])}>
      <Button type="primary" disabled>
        Speichern
      </Button>
    </div>
  </div>
);

export default ElectionEditPage;
