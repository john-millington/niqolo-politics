import React, { Component, Fragment } from 'react';

import { Icon } from 'semantic-ui-react';
import Polling from './../../containers/Polling';
import PredictionsBar from './../../containers/PredictionsBar';

import './styles/Header.css';

class Header extends Component {
  state = {
    isPollingVisible: false,
    isPredictionBarVisible: false
  }

  constructor(props) {
    super(props);

    this.onClickCustom = this.onClickCustom.bind(this);
    this.onClickPolling = this.onClickPolling.bind(this);
    this.onClickPredict = this.onClickPredict.bind(this);
    this.onSelectPoll = this.onSelectPoll.bind(this);
  }

  onClickPolling() {
    this.setState({
      isPollingVisible: !this.state.isPollingVisible
    });
  }

  onClickCustom() {
    this.setState({
      isPredictionBarVisible: !this.state.isPredictionBarVisible
    });
  }

  onClickPredict(...args) {
    const {
      onPredict
    } = this.props;

    this.setState({
      isPredictionBarVisible: false
    }, () => onPredict(...args));
  }

  onSelectPoll(data) {
    const {
      onPredict
    } = this.props;

    this.setState({
      isPollingVisible: false
    }, () => {
      if (onPredict) {
        onPredict(data);
      }
    });
  }

  render() {
    const {
      classPrefix = 'niq-header'
    } = this.props;

    return (
      <Fragment>
        <div className={`${classPrefix}__container`}>
          <div className={`${classPrefix}__left`}>
            <button className={`${classPrefix}__action`} onClick={this.onClickCustom}>
              <Icon className={`${classPrefix}__action-icon`} name="setting" />
              <span className={`${classPrefix}__action-label`}>Custom</span>
            </button>
            <button className={`${classPrefix}__action`} onClick={this.onClickPolling}>
              <Icon className={`${classPrefix}__action-icon`} name="chart line" />
              <span className={`${classPrefix}__action-label`}>Polls</span>
            </button>
          </div>
          <div className={`${classPrefix}__title`}>
            <span className={`${classPrefix}__title-primary`}>NIQOLO</span>
            <span className={`${classPrefix}__title-secondary`}>Election 2019</span>
          </div>
          <div className={`${classPrefix}__right`}>

          </div>
        </div>
        <PredictionsBar
          onPredict={this.onClickPredict}
          visible={this.state.isPredictionBarVisible}
        />
        {this.state.isPollingVisible && (
          <Polling
            onClose={this.onClickPolling}
            onSelect={this.onSelectPoll}
          />
        )}
      </Fragment>
    );
  }
}

export default Header;
