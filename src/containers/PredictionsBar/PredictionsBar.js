import React, { Component } from 'react';
import classnames from 'classnames';

import './styles/PredictionsBar.css';

const PARTIES = [
  { code: 'CON', default: 0.4234 },
  { code: 'LAB', default: 0.3999 },
  { code: 'LIB', default: 0.0737 },
  { code: 'BXP', default: 0.0184 },
  { code: 'GRN', default: 0.0163 },
  { code: 'SNP', default: 0.0304 },
  { code: 'PLC', default: 0.0051 },
  // { code: 'UUP', default: 0.00225 },
  // { code: 'SDLP', default: 0.002 },
  // { code: 'DUP', default: 0.0075 },
  // { code: 'SF', default: 0.00625 },
  // { code: 'ALL', default: 0.00525 },
];

class PredictionsBar extends Component {
  state = {
    fields: {}
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClickPredict = this.onClickPredict.bind(this);

    PARTIES.forEach(party => this.state.fields[party.code] = party.default * 100);
  }

  onChange(event) {
    this.setState({
      fields: {
        ...this.state.fields,
        [event.target.name]: event.target.value
      }
    });
  }

  onClickPredict() {
    const {
      onPredict
    } = this.props;

    const fields = {
      ...this.state.fields
    };

    Object.keys(fields).forEach(key => fields[key] = parseFloat(fields[key]) / 100);
    if (onPredict) {
      onPredict({
        ...fields
      });
    }
  }

  render() {
    const {
      classPrefix = 'niq-predictions',
      visible
    } = this.props;
    
    const containerCls = classnames(classPrefix, {
      [`${classPrefix}--visible`]: visible
    });

    return (
      <div className={containerCls}>
        {PARTIES.map(party => (
          <div className={`niq-predictions__input`}>
            <span className={`niq-predictions__input-label ${party.code.toLowerCase()}-contrast`}>{party.code}</span>
            <div className="niq-predictions__input-wrapper">
              <input
                onChange={this.onChange}
                name={party.code}
                type="text"
                placeholder={(party.default * 100).toFixed(2)}
                value={this.state.fields[party.code]}
              /> %
            </div>
          </div>
        ))}
        <div className="niq-predictions__button">
          <button onClick={this.onClickPredict}>Predict</button>
        </div>
      </div>
    );
  }
}

export default PredictionsBar;