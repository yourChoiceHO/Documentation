import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Divider } from 'antd';
import getClassNames from '../../helpers/get-class-names';
import styles from './styles/footer.module.less';

const { Footer } = Layout;
const cx = getClassNames(styles);

const PageFooter = () => (
  <Footer className={cx('footer')}>
    <Divider className={cx('horizontal-divider')} type="horizontal" />
    <small>
      <p className={cx('paragraph')}>
        <Link to="/impressum">Impressum</Link>
        <span> &middot; </span>
        <Link to="/bedingungen">Datenschutz &amp; AGB</Link>
        <span> &middot; </span>
        <Link to="/hilfe">Hilfe</Link>
      </p>
      <p className={cx('paragraph')}>
        <a
          href="https://github.com/yourChoiceHO/Implementation"
          target="_blank"
          rel="noopener noreferrer"
        >
          yourChoice
        </a>
        <span> &copy;{new Date().getFullYear()} &middot; Erstellt von </span>
        <a href="https://github.com/yourChoiceHO" target="_blank" rel="noopener noreferrer">
          yourChoice HO
        </a>
      </p>
      <p className={cx('paragraph')}>
        <Link to="/mitarbeiter/anmeldung">Mitarbeiter</Link>
      </p>
    </small>
  </Footer>
);

export default PageFooter;
