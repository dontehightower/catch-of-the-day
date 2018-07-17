import React, { Component } from 'react';
import Header from './Header';
import createHistory from 'history/createBrowserHistory';

import { getFunName } from '../helpers';

const history = createHistory();

class StorePicker extends Component {
  constructor(props) {
    super(props);

    this.goToStore = this.goToStore.bind(this);
  }
  goToStore(e) {
    e.preventDefault();
    console.log('You changed the URL');
    // grab the text from the box
    this.storeId = this.storeInput.value;
    // transition from / to / store/:storeId
    history.push(`/store/${this.storeId}`);
  }

  render() {
    return (
      <div>
        <Header tagline="dat app doe" />
        <h2>Please Enter A Store</h2>
        <form className="store-selector" onSubmit={this.goToStore}>
          <input
            type="text"
            placholder="Store Name"
            defaultValue={getFunName()}
            ref={input => {
              this.storeInput = input;
            }}
          />
          <button type="submit">Visit Store</button>
        </form>
      </div>
    );
  }
}

export default StorePicker;
