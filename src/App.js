import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
    };
  }

  nameChangeEvent = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  ageChangeEvent = (event) => {
    this.setState({
      age: event.target.value,
    });
  };

  onClick = (obj) => {
    this.setState({
      name: "",
      age: "",
    });
    return this.props.onClick(obj);
  };
  render() {
    return (
      <div class="add-screen">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="name"
            value={this.state.name}
            onChange={this.nameChangeEvent}
          ></input>
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="age"
            class="form-control"
            value={this.state.age}
            onChange={this.ageChangeEvent}
          ></input>
        </div>
        <button
          type="button"
          class="btn btn-default"
          onClick={(obj) =>
            this.onClick({ name: this.state.name, age: this.state.age })
          }
        >
          Add Person
        </button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      ticketPrice: 0,
    };
  }

  addItem = (props) => {
    let newItems = this.state.allItems.slice();
    if (props.name && props.age) {
      newItems.push({
        name: props.name,
        age: props.age,
      });
    } else if (props.name) {
      alert("please provide age also");
    } else if (props.age) {
      alert("please provide name also");
    } else {
      alert("nothing to add");
    }

    this.setState({
      allItems: newItems,
    });
  };

  priceChangeEvent = (event) => {
    this.setState({
      ticketPrice: event.target.value,
    });
  };

  render() {
    let items = this.state.allItems.slice();
    let totalCost = 0;
    items = items.map((item) => {
      let age = parseInt(item.age);
      let cost = 0;
      if (age >= 5 && age <= 16) {
        cost = Math.round(0.8 * this.state.ticketPrice);
      } else if (age >= 17 && age <= 50) {
        cost = this.state.ticketPrice;
      } else if (age > 50) {
        cost = Math.round(0.7 * this.state.ticketPrice);
      }
      cost = Math.round(cost);
      totalCost += cost;
      return (
        <div>
          <textarea id="name" value={item.name} readOnly></textarea>
          <textarea id="cost" value={cost} readOnly></textarea>
        </div>
      );
    });

    console.log(items);

    const element = (
      <div class="app">
        <div class="column">
          <label for="price">Ticket Price </label>
          <input
            type="text"
            id="price"
            class="form-control"
            value={this.state.ticketPrice}
            onChange={this.priceChangeEvent}
          ></input>
        </div>
        <div class="column">
          <AddItem onClick={(obj) => this.addItem(obj)} />
        </div>
        <div class="column" id="items">
          {items}
          Total : {totalCost}
        </div>
        <div class="column">Total : {totalCost}</div>
      </div>
    );
    return element;
  }
}

export default App;
