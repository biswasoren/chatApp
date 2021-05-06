import React from "react";
import "./send.css";
import socket from "./socket";

class Send extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor (props) {
        super(props);
        this.state = {
            msgData: []
        };
    }

  sendMsg = () => {
      const target = document.getElementById("msgBox");
      console.log(target.value);

      socket.emit("which_user", null);
      socket.on("this_user", (user) => {
          console.log(user);
          if (target.value) {
              fetch("/api/message/send", {
                  method: "post",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ message: target.value, user: user })
              });
          }
          target.value = null;
      });
  };

  render () {
      return (
          <div className="inputBox">
              <div className="textBox">
                  <input id="msgBox" placeholder="Type Your Message" />
              </div>
              <div className="sendBtn">
                  <div
                      className="sendSvg"
                      onClick={() => {
                          this.sendMsg();
                      }}
                  >
                      <svg
                          width="45"
                          height="45"
                          viewBox="0 0 45 45"
                          fill="none"
                          background="#F5F5F5"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <circle cx="22.5" cy="22.5" r="22.5" fill="#C4C4C4" />
                          <path
                              d="M13.9962 11L34 22.6022L12 35L19.6763 22.6022L13.9962 11Z"
                              fill="#E17A7A"
                          />
                      </svg>
                  </div>
              </div>
          </div>
      );
  }
}

export default Send;
