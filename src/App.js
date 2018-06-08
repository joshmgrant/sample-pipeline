import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}


class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    const className = "scale-type-" + scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input class={className} value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class TemperatureMessage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const celsius = this.props.celsius;
    const fahrenheit = this.props.fahrenheit;
    
    if (!celsius || !fahrenheit) {
      return (
        <div class="temperatureMesssage"> 
          <h2>Watiting for input...</h2>
        </div>
      );
    }
    
    return (
      <div class="temperatureMesssage">
        <h2>{celsius} Celsius is {fahrenheit} Farenheit</h2>
      </div>);
  };
}


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
          <hr/>
          <TemperatureMessage celsius={celsius} fahrenheit={fahrenheit} />
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Celcius to Farhenheit Calculator!</h1>
        </header>
        
        <div className="App-form">
          {/* <Convert />
          <ShowFarenheit value="0" /> */}
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
