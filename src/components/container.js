import React from "react";
import ChatBox from "./chatBox";
import Login from "./login";
import "./chatBox.css";

class Container extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor (props) {
        super(props);
        this.state = {
            switch: {
                register: "none",
                login: "block",
                chat: "none"
            }
        };
    }

    componentDidMount () {}

  updateState = (state) => {
      this.setState({
          switch: state
      });
  };

  render () {
      return (
          <div>
              <div style={{ display: this.state.switch.login, height: "100vh" }}>
                  <Login updateState={this.updateState} />
              </div>

              <div style={{ display: this.state.switch.chat, height: "100vh" }}>
                  <ChatBox updateState={this.updateState} />
              </div>
          </div>
      );
  }
}

export default Container;
