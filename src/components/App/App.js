import React, { Component } from 'react';
import Switch from '../Switch';
import Select from '../Select';
import './style.scss';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Switch />

        <div className='selectComponents'>
          <Select
            label='React Single Select'
            placeholder='Please select'
            options={[
              { value: 'Rock' },
              { value: 'Paper' },
              { value: 'Scissors' },
            ]}
            minWidth={220}
          />
          <Select
            label='React Multiple Select'
            placeholder='Please select'
            options={[
              { value: 'Rock' },
              { value: 'Paper' },
              { value: 'Scissors' },
              { value: 'Home' },
              { value: 'Red' },
              { value: 'Green' },
              { value: 'Blue' },
              { value: 'Color' },
              { value: 'Fruits' },
              { value: 'Eggs' },
              { value: 'Meat' },
            ]}
            minWidth={220}
            multiple
          />
        </div>
      </div>
    );
  }
}

export default App;
