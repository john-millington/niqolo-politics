import React, { Component } from 'react';
import './PredictionsBar.css';

const PARTIES = [
  { code: 'CON', default: 0.39 },
  { code: 'LAB', default: 0.26 },
  { code: 'LIB', default: 0.17 },
  { code: 'BXP', default: 0.10 },
  { code: 'GRN', default: 0.04 },
  { code: 'SNP', default: 0.04 },
  { code: 'PLC', default: 0.008 },
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
    return (
      <div className="niq-predictions-bar">
        {PARTIES.map(party => (
          <div className={`niq-prediction-input ${party.code.toLowerCase()}`}>
            <span className="niq-prediction-label">{party.code}</span>
            <input
              onChange={this.onChange}
              name={party.code}
              type="text"
              placeholder={(party.default * 100).toFixed(2)}
              value={this.state.fields[party.code]}
            />
          </div>
        ))}
        <div className="niq-prediction-button">
          <button onClick={this.onClickPredict}>Predict</button>
        </div>
      </div>
    );
  }
}

export default PredictionsBar;