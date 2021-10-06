import React, { Component, useState, createRef, useEffect } from "react";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const apiUrl = 'https://api.chucknorris.io/jokes/random';
const getRandomJoke = (onSuccess) => {
  fetch(apiUrl)
    .then(data => data.json())
    .then(json => onSuccess(json.value))
    .catch(err => console.log(err));
}
export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [
    {
      key: 1,
      type: "",
      msg: "Hi Josefina, How are you?",
      date:"4/22/2017, 4:00 AM",
    },
    {
      key: 2,
      image:
        "https://m.media-amazon.com/images/M/MV5BZmUzMWE4ZjMtZTAwMS00MGQ1LWExMGYtMmZmNmVkODFkZmFjXkEyXkFqcGdeQXVyMzQxNTk0ODg@._V1_.jpg",
      type: "other",
      msg: "I am fine.",
      date:"4/22/2017, 4:05 AM",
    },
    {
      key: 3,
      type: "",
      msg: "What are you doing?",
      date: "4/22/2017, 4:10 AM",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
      date: Date.now(),
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      getRandomJoke((text) => {
        this.chatItms.push({
          key: 5,
          type:"other",
          msg: text,
          image: "https://m.media-amazon.com/images/M/MV5BZmUzMWE4ZjMtZTAwMS00MGQ1LWExMGYtMmZmNmVkODFkZmFjXkEyXkFqcGdeQXVyMzQxNTk0ODg@._V1_.jpg",
          date: new Date().toLocaleString('en-US',{month: 'numeric',day: 'numeric',year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
        });
      });
    }, 15000);   
  };

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != "") {
          this.chatItms.push({
            key: 4,
            type: "",
            msg: this.state.msg,
            date: new Date().toLocaleString('en-US',{month: 'numeric',day: 'numeric',year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
          });
          this.setState({ chat: [...this.chatItms] });
          this.scrollToBottom();
          this.setState({ msg: "" });
        }
      }  
    });
    this.scrollToBottom();
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  }; 
  componentWillUpdate(_nextProps, nextState){
    localStorage.setItem('chat',JSON.stringify(nextState.chat));
  }
  componentWillMount(){
    localStorage.getItem('chat')&& this.setState({
      chat: JSON.parse(localStorage.getItem('chat')),
      isLoading: false,
    });
  } 
  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                  image="https://m.media-amazon.com/images/M/MV5BZmUzMWE4ZjMtZTAwMS00MGQ1LWExMGYtMmZmNmVkODFkZmFjXkEyXkFqcGdeQXVyMzQxNTk0ODg@._V1_.jpg"
                  isOnline="active"
              />
              <p>Josefina</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key + 1}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  date={itm.date}
                  image={itm.image}
                />
              );
            })}
            
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
            <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}