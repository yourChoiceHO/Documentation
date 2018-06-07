import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

import getClassNames from '../helpers/get-class-names';
import styles from './styles/not-found.module.less';

const cx = getClassNames(styles);

const NotFoundPage = () => (
  <div className={cx('not-found')}>
    <div className={cx('question')}>
      <Icon type="question-circle-o" />
    </div>

    <h2 className={cx('title')}>Huch... uns ist ein Fehler unterlaufen!</h2>

    <div className={cx('notice')}>
      <p className={cx('paragraph')}>
        Leider konnte die angeforderte Seite nicht gefunden. Oder aber irgendetwas ist
        schiefgelaufen. Wir werden uns dem Problem schnellstmöglich annehmen.
        <br />
        <br />
        Vielen Dank für Ihr Verständnis.
      </p>
      <Button icon="home" type="primary">
        <Link className={cx('link')} to="/">
          Zurück zur Startseite
        </Link>
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
