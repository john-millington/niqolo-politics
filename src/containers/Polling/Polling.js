import React, { Component } from 'react';

import Modal from './../../components/Modal';
import Section from './../../components/Section';
import Table from './../../components/Table';

class Polling extends Component {
  state = {
    polls: null
  };

  componentDidMount() {
    fetch('/api/polls').then(response => response.json()).then(response => {
      this.setState({
        polls: response.results
      });
    });
  }

  render() {
    const {
      polls
    } = this.state;

    if (polls === null) {
      return null;
    }

    const headers = [
      { label: 'Pollster' },
      { label: 'Date conducted' },
      ...Object.keys(polls[0].parties).map(label => ({ label }))
    ];

    const rows = polls.map(result => {
      return {
        data: result.parties,
        columns: [
          { value: result.pollster.split('/')[0] },
          { value: result.date },
          ...Object.keys(result.parties).map(key => ({
            className: key.toLowerCase(),
            value: <b>{`${(parseFloat(result.parties[key], 10) * 100).toFixed(0)}%`}</b>
          }))
        ]
      };
    }); 

    return (
      <Modal title="Polling" onClose={this.props.onClose}>
        <Section title="Recent Polling">
          <Table headers={headers} rows={rows} onSelect={this.props.onSelect} />
        </Section>
      </Modal>
    );
  }
}

export default Polling;
