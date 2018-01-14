import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Radio, Select, DatePicker, TimePicker, Upload, Icon } from 'antd';

import getClassNames from '../../helpers/get-class-names';
import styles from './styles/election.module.less';

const cx = getClassNames(styles);

const { Dragger } = Upload;
const { Option } = Select;
const RadioGroup = Radio.Group;

class ElectionNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Fragment>
        <div className={cx('actions')}>
          <div className={cx(['action', 'action--left'])}>
            <Button type="default">
              <Link to="/">Zurück zur Übersicht</Link>
            </Button>
          </div>
          <div className={cx(['action', 'action--right'])}>
            <Button type="primary" disabled>
              Erstellen
            </Button>
          </div>
        </div>
        <Row gutter={16} className={cx('row')}>
          <Col span={8}>
            <h3 className={cx('title')}>Art der Wahl</h3>
            <RadioGroup onChange={this.handleChange} value={value}>
              <Radio style={radioStyle} value="europawahl">
                Europawahl
              </Radio>
              <Radio style={radioStyle} value="bundestagswahl">
                Bundestagswahl
              </Radio>
              <Radio style={radioStyle} value="landratswahl">
                Landratswahl
              </Radio>
              <Radio style={radioStyle} value="buergerentscheid">
                Bürgerentscheid
              </Radio>
              <Radio style={radioStyle} value="gemeinderatswahl">
                Gemeinderatswahl
              </Radio>
              <Radio style={radioStyle} value="buergermeisterwahl">
                Bürgermeisterwahl
              </Radio>
            </RadioGroup>
          </Col>
          <Col span={8}>
            <h3 className={cx('title')}>Wahlkreis</h3>
            <Select
              showSearch
              className={cx('field')}
              placeholder="Wählen Sie einen Wahlkreis aus"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Col>
          <Col span={8}>
            <h3 className={cx('title')}>Start- &amp; Endzeitraum</h3>
            <h4>Beginn</h4>
            <div className={cx('picker')}>
              <DatePicker className={cx('date')} format="YYYY-MM-DD" placeholder="Start-Datum" />
              <TimePicker className={cx('time')} format="HH:mm" placeholder="Start-Zeit" />
            </div>
            <h4>Schluss</h4>
            <div className={cx('picker')}>
              <DatePicker className={cx('date')} format="YYYY-MM-DD" placeholder="Schluss-Datum" />
              <TimePicker className={cx('time')} format="HH:mm" placeholder="Schluss-Zeit" />
            </div>
          </Col>
        </Row>
        <Row gutter={16} className={cx('upload-row')}>
          <Col span={8} className={cx('upload-column')}>
            <h3 className={cx('upload-title')}>Wählerliste importieren</h3>
            <Dragger className={cx('upload')}>
              <p>
                <Icon className={cx('upload-icon')} type="copy" />
              </p>
              <p>
                Klicken oder ziehen Sie eine Datei auf das Feld um eine Wählerliste zu importieren.
              </p>
            </Dragger>
          </Col>
          <Col span={8} className={cx('upload-column')}>
            <h3 className={cx('upload-title')}>Parteiliste importieren</h3>
            <Dragger className={cx('upload')}>
              <p>
                <Icon className={cx('upload-icon')} type="bars" />
              </p>
              <p>
                Klicken oder ziehen Sie eine Datei auf das Feld um eine Parteiliste zu importieren.
              </p>
            </Dragger>
          </Col>
          <Col span={8} className={cx('upload-column')}>
            <h3 className={cx('upload-title')}>Kandidatenliste importieren</h3>
            <Dragger className={cx('upload')}>
              <p>
                <Icon className={cx('upload-icon')} type="usergroup-add" />
              </p>
              <p>
                Klicken oder ziehen Sie eine Datei auf das Feld um eine Kandidatenliste zu
                importieren.
              </p>
            </Dragger>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default ElectionNewPage;
