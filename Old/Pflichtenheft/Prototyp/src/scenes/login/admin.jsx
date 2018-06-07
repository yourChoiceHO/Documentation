import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Alert } from 'antd';
import { path, pathOr, split, concat, isNil } from 'ramda';

import Authentication from '../../services/authentication';

import Icon from '../../components/icon';
import getClassNames from '../../helpers/get-class-names';
import styles from './styles/admin.module.less';

const splitPath = split('/');

const FormItem = Form.Item;

const cx = getClassNames(styles);

class AdminLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: {},
    };
  }

  componentDidMount() {}

  handleSubmit = () => {
    this.props.form.validateFields((err, credentials) => {
      if (err) {
        this.setState({ error: err, loading: false });
      } else {
        this.setState({ error: null, loading: true });

        const pathname = path(['location', 'pathname'], this.props);
        const parentPath = concat('/', path([1], splitPath(pathname)));
        const referrer = pathOr(parentPath, ['location', 'state', 'referrer'], this.props);

        Authentication.loginAdmin({
          credentials,
          referrer,
        }).done((error) => {
          if (error) {
            console.log(error);
            this.props.form.resetFields();
            this.setState({ error, loading: false });
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, error } = this.state;

    const errorMessage = path(['response', 'data', 'reason'], error);

    if (error && error.response) {
      console.error(error.response.data.reason);
    }

    return (
      <Card
        title={<h2 className={cx('title')}>Mitarbeiter Anmeldung</h2>}
        bordered={false}
        className={cx('card')}
      >
        <Form>
          {!isNil(errorMessage) && (
            <Alert message={errorMessage} type="error" className={cx('alert')} showIcon />
          )}
          <FormItem className={cx('field')}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Bitte geben Sie Ihren Benutzernamen an!' }],
            })(<Input
              size="large"
              prefix={<Icon type="AccountCircle" />}
              placeholder="Benutzername"
            />)}
          </FormItem>
          <FormItem className={cx('field')}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Bitte geben Sie Ihr Passwort an!' }],
            })(<Input
              size="large"
              prefix={<Icon type="Lock" />}
              type="password"
              placeholder="Passwort"
            />)}
          </FormItem>
          <FormItem className={cx('field')}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className={cx('submit')}
              loading={loading}
              onClick={this.handleSubmit}
            >
              Anmelden
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

AdminLoginPage.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
};

export default Form.create()(AdminLoginPage);
