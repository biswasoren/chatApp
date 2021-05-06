import React from "react";
import "./box.css";
import socket from "./socket";

class Box extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            msgData: []
        };
    }

    componentDidMount () {
        socket.on("get_msg", (data) => {
            const msgData = this.state.msgData;
            const obj = {};
            obj.msg = data.message;
            obj.time = this.timeSince(new Date(data.time));
            obj.tone = data.tone;
            obj.sent_from = data.sent_from;

            msgData.push(obj);

            this.setState(
                {
                    msgData
                },
                () => {
                    this.scrollToBottomSooth();
                }
            );
        });

        this.getMessages();
    }

    componentDidUpdate () {
        if (this.state.msgLen === this.state.msgData.length) this.scrollToBottom();
    }

  scrollToBottom = () => {
      this.messagesEnd.scrollIntoView();
  };

  scrollToBottomSooth = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

    timeSince = (date) => {
        let seconds = Math.floor((new Date() - date) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

  getMessages = () => {
      fetch("/api/message/getAll")
          .then((results) => results.json())
          .then((info) => {
              const msgData = [];
              const data = info;
              data.forEach((element) => {
                  const obj = {};
                  obj.msg = element.message;
                  obj.time = this.timeSince(new Date(element.time));
                  obj.tone = element.tone;
                  obj.sent_from = element.sent_from;
                  msgData.push(obj);
              });
              this.setState({
                  msgData,
                  msgLen: msgData.length
              });
          });
  };

  setImage = (tone) => {
      const imageEmotionMap = {
          Joy: "happy.svg",
          Anger: "angry.svg",
          Sadness: "sad.svg",
          Fear: "sad.svg"
      };
      if (Object.keys(imageEmotionMap).includes(tone)) {
          return imageEmotionMap[tone];
      } else return "normal.svg";
  };

  displayMessage = (msg) => {
      const activeUser = localStorage.getItem("active_user");
      return (
          <div
              className={` msg-bubble ${
                  activeUser === msg.sent_from ? "active-msg" : ""
              }`}
          >
              <div
                  className={`user-name ${
                      activeUser === msg.sent_from ? "active" : ""
                  }`}
              >
                  <img
                      className="user-logo"
                      src={`${
                          activeUser === msg.sent_from ? "user-black.svg" : "user-red.svg"
                      }`}
                      alt="select"
                  />
                  {msg.sent_from}
              </div>
              <div
                  className={`message ${activeUser === msg.sent_from ? "active" : ""}`}
              >
                  <div className="msg">{msg.msg}</div>
                  <div style={{ display: "flex" }}>
                      <img
                          src={this.setImage(msg.tone)}
                          style={{ width: "30px" }}
                          alt="emoji"
                      />
                  </div>
              </div>
              <div className="time">
                  {msg.time} ago
              </div>
          </div>
      );
  };

  render () {
      return (
          <div className="chat-container">
              {this.state.msgData ?
                  this.state.msgData.map((msg) => this.displayMessage(msg)) :
                  null}
              <div
                  style={{ float: "left", clear: "both" }}
                  ref={(el) => {
                      this.messagesEnd = el;
                  }}
              />
          </div>
      );
  }
}

export default Box;
