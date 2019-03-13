import React, { Component } from 'react';
import './style.scss';

class componentName extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isChecked: false,
    };
  }

  componentWillMount() {
    const { isChecked } = this.props;
    this.setState({ isChecked });
  }

  handleChange(event) {
    this.setState({ isChecked: event.target.checked });
    console.log(`checked: ${event.target.checked}`);
  }

  render() {
    return (
      <div className='switchContainer'>
        <label>
          <input
            checked={this.state.isChecked}
            onChange={this.handleChange}
            className='switch'
            type='checkbox'
          />
          <div>
            <div />
          </div>
        </label>
      </div>
    );
  }
}

export default componentName;
