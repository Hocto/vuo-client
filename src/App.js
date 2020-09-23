import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();

    this.state = {
      count: 0,
      endpoint: "http://localhost:4000",
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    this.isAlive(socket);
  }

  isAlive = (socket) => {
    socket.on("server", (data) => {
      this.setState({ count: data }, () => {
        console.log("Count:", this.state.count);
      });
    });
  };

  handleClick = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit("increment", 0);
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}

export default App;
