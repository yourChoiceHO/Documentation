import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import getClassNames from '../../helpers/get-class-names';
import styles from './styles/election.module.less';

const cx = getClassNames(styles);

const ElectionRemovePage = props => (
  <div className={cx('actions')}>
    <div className={cx(['action', 'action--left'])}>
      <Button type="default">
        <Link to="/">Zurück zur Übersicht</Link>
      </Button>
      <h3>Sind Sie sicher, dass sie diese Wahl löschen möchten?</h3>
      <Button type="default">
        <Link to="/">Abbrechen</Link>
      </Button>
      <Button type="danger">
        <Link to="/">Bestätigen</Link>
      </Button>
    </div>
  </div>
);

export default ElectionRemovePage;
