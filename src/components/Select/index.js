import React, { Component } from 'react';
import './style.scss';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      focusedValue: -1,
      isFocused: false,
      isOpen: false,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDeleteOption = this.onDeleteOption.bind(this);
    this.onHoverOption = this.onHoverOption.bind(this);
    this.onClickOption = this.onClickOption.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  onFocus() {
    this.setState({
      isFocused: true,
    });
  }

  onBlur() {
    const { options, multiple } = this.props;

    this.setState(prevState => {
      const { values } = prevState;
      if (multiple) {
        return {
          focusedValue: -1,
          isFocused: false,
          isOpen: false,
        };
      } else {
        const value = values[0];
        let focusedValue = -1;
        if (value) {
          focusedValue = options.findIndex(option => option.value === value);
        }

        return {
          focusedValue,
          isFocused: false,
          isOpen: false,
        };
      }
    });
  }

  onClick() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  onDeleteOption(e) {
    const { value } = e.currentTarget.dataset;
    this.setState(prevState => {
      const [...values] = prevState.values;
      const index = values.indexOf(value);
      values.splice(index, 1);
      return { values };
    });
  }

  onHoverOption(e) {
    const { options } = this.props;
    const { value } = e.currentTarget.dataset;
    const index = options.findIndex(option => option.value === value);
    this.setState({
      focusedValue: index,
    });
  }

  onClickOption(e) {
    const { multiple } = this.props;
    const { value } = e.currentTarget.dataset;
    this.setState(prevState => {
      if (!multiple) {
        return {
          values: [value],
          isOpen: false,
        };
      }
      const [...values] = prevState.values;
      const index = values.indexOf(value);
      if (index === -1) {
        values.push(value);
      } else {
        values.splice(index, 1);
      }
      return { values };
    });
  }

  handleToggleAll() {
    const { options } = this.props;
    const { values } = this.state;
    if (options.length > values.length) {
      this.setState({
        values: options.map(option => {
          return option.value;
        }),
      });
    } else {
      this.setState({
        values: [],
      });
    }
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  renderValues() {
    const { placeholder, multiple, options } = this.props;
    const { values } = this.state;
    if (values.length === 0) {
      return <div className='placeholder'>{placeholder}</div>;
    }
    if (multiple) {
      if (values.length <= 4) {
        return values.map(value => {
          return (
            <span
              key={value}
              onClick={this.stopPropagation}
              className='multiple value'
            >
              {value}
              <span
                data-value={value}
                onClick={this.onDeleteOption}
                className='delete'
              >
                X
              </span>
            </span>
          );
        });
      } else {
        return (
          <div className='placeholder'>{`${values.length} of ${
            options.length
          } selected`}</div>
        );
      }
    }

    return <div className='value'>{values[0]}</div>;
  }

  renderOptions() {
    const { options, multiple } = this.props;
    const { isOpen } = this.state;
    if (!isOpen) {
      return null;
    }
    if (multiple) {
      return (
        <div className='options'>
          <div className='toggleAll' onClick={this.handleToggleAll}>
            Toggle All
          </div>
          {options.map(this.renderOption)}
        </div>
      );
    } else {
      return <div className='options'>{options.map(this.renderOption)}</div>;
    }
  }

  renderOption(option, index) {
    const { multiple } = this.props;
    const { values, focusedValue } = this.state;
    const { value } = option;
    const selected = values.includes(value);
    let className = 'option';
    if (selected) className += ' selected';
    if (index === focusedValue) className += ' focused';

    return (
      <div
        key={value}
        data-value={value}
        className={className}
        onMouseOver={this.onHoverOption}
        onClick={this.onClickOption}
      >
        {multiple ? (
          <span className='checkbox'>{selected ? <Check /> : null}</span>
        ) : null}
        {value}
      </div>
    );
  }

  render() {
    const { label, minWidth } = this.props;
    const { isOpen, values } = this.state;
    console.log(values);
    return (
      <div
        style={{ minWidth: minWidth }}
        className='select'
        tabIndex='0'
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <label className='label'>{label}</label>
        <div className='selection' onClick={this.onClick}>
          {this.renderValues()}
          <span className='arrowWrapper'>
            <i className={`arrow ${isOpen ? 'upArrow' : 'downArrow'}`} />
          </span>
        </div>
        {this.renderOptions()}
      </div>
    );
  }
}

const Check = () => (
  <svg viewBox='0 0 16 16'>
    <path
      d='M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z'
      transform='translate(0 1)'
    />
  </svg>
);

export default Select;
