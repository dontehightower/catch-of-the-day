import React, { Component } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

import base from '../base';
import sampleFishes from '../sample-fishes';

class App extends Component {
  constructor(props) {
    super(props);
    // initialState
    this.state = {
      fishes: {},
      order: {}
    };

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  // when the component mounts
  // check for a localStorage item for the current store
  // if so, set state.order to be the value of the localStorage item
  //sync to the firebase and sync the state of the current App instance
  componentWillMount() {
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    const localStorageRef = localStorage.getItem(
      `order-${this.props.match.params.storeId}`
    );

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.match.params.storeId}`,
      JSON.stringify(nextState.order)
    );
  }

  // when the component unmounts, remove the firebase binding
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish(fish) {
    //update state
    const fishes = { ...this.state.fishes };
    // add new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes });
  }

  updateFish(key, fish) {
    const fishes = { ...this.state.fishes };
    fishes[key] = fish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // copy the state
    const order = { ...this.state.order };
    // update the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="dat app doe" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(fish => (
              <Fish
                addToOrder={this.addToOrder}
                key={fish}
                thisFish={fish}
                details={this.state.fishes[fish]}
              />
            ))}
          </ul>
        </div>
        <Order
          params={this.props.match.params}
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          loadSamples={this.loadSamples}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
        />
      </div>
    );
  }
}

export default App;
