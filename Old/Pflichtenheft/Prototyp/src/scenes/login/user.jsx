import React, { Component } from "react";
import { Form, Input, Button, Alert, Steps } from "antd";
import { path, pathOr, split, concat, isNil } from "ramda";
import PropTypes from "prop-types";

import Authentication from "../../services/authentication";

import Icon from "../../components/icon";

import getClassNames from "../../helpers/get-class-names";
import styles from "./styles/user.module.less";

const splitPath = split("/");

const FormItem = Form.Item;
const { Step } = Steps;

const cx = getClassNames(styles);

class UserLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: {},
      step: 0
    };

    this.renderLoginForm = this.renderLoginForm.bind(this);
  }

  componentDidMount() {}

  previousStep() {
    this.setState(state => ({
      step: state.step - 1
    }));
  }

  nextStep() {
    this.setState(state => ({
      step: state.step + 1
    }));
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, credentials) => {
      if (err) {
        this.setState({ error: err, loading: false });
      } else {
        this.setState({ error: null, loading: true });

        const pathname = path(["location", "pathname"], this.props);
        const parentPath = concat("/", path([1], splitPath(pathname)));
        const referrer = pathOr(
          parentPath,
          ["location", "state", "referrer"],
          this.props
        );

        Authentication.loginUser({
          credentials,
          referrer
        }).done(error => {
          if (error) {
            console.log(error);
            this.props.form.resetFields();
            this.setState({ error, loading: false });
          }
        });
      }
    });
  };

  renderLoginForm() {
    const { getFieldDecorator } = this.props.form;
    // eslint-disable-next-line
    const { loading, error, step } = this.state;

    const errorMessage = path(["response", "data", "reason"], error);

    return (
      <Form className={cx("form")}>
        {!isNil(errorMessage) && (
          <Alert
            message={errorMessage}
            type="error"
            className={cx("alert")}
            showIcon
          />
        )}
        <FormItem>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Bitte geben Sie Ihren Benutzernamen an!"
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="AccountCircle" />}
              placeholder="Benutzername"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Bitte geben Sie Ihr Passwort an!" }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="Lock" />}
              type="password"
              placeholder="Passwort"
            />
          )}
        </FormItem>
      </Form>
    );
  }

  render() {
    // eslint-disable-next-line
    const { getFieldDecorator } = this.props.form;
    const { loading, error, step } = this.state;
    // eslint-disable-next-line
    const errorMessage = path(["response", "data", "reason"], error);

    const steps = [
      {
        title: "Initialisierung",
        description: "Scanner anschließen",
        content: () => (
          <div className={cx("step")}>
            <div className={cx("usb")}>
              <Icon type="Usb" />
            </div>
            <Button type="primary" loading>
              Scanner suchen
            </Button>
          </div>
        )
      },
      {
        title: "Verifizierung",
        description: "Fingerabdruck scannen",
        content: () => (
          <div className={cx("step")}>
            <div className={cx("fingerprint")}>
              <Icon type="Fingerprint" />
            </div>
            <Button type="primary" loading>
              Fingerabdruck überprüfen
            </Button>
          </div>
        )
      },
      {
        title: "Anmeldung",
        description: "Identität bestätigen",
        content: this.renderLoginForm
      }
    ];

    const Content = steps[step].content;

    if (error && error.response) {
      console.error(error.response.data.reason);
    }

    return (
      <div className={cx("steps")}>
        <Steps current={step}>
          {steps.map((item, index) => {
            let status = "";

            if (step === index) {
              status = "process";
            } else if (index > step) {
              status = "wait";
            } else {
              status = "finish";
            }

            return (
              <Step
                key={item.title}
                status={status}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </Steps>
        <div className={cx("steps-content")}>
          <Content />
        </div>
        <div className={cx("steps-action")}>
          {step > 0 ? (
            <Button type="default" onClick={() => this.previousStep()}>
              Zurück
            </Button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 && (
            <Button type="primary" onClick={() => this.nextStep()}>
              Weiter
            </Button>
          )}
          {step === steps.length - 1 && (
            <Button
              type="primary"
              loading={loading}
              onClick={() => this.handleSubmit()}
            >
              Anmelden
            </Button>
          )}
        </div>
      </div>
    );
  }
}

UserLoginPage.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired
  }).isRequired
};

export default Form.create()(UserLoginPage);
