import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import Avatar from "../chatList/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default class ChatList extends Component {
  allChatUsers = [
    {
      image:
      "https://pbs.twimg.com/profile_images/696268637192089600/64ZFjUfN_400x400.jpg",
    id: 1,
    name: "Alice Freeman",
    active: false,
    isOnline: false,
    },
    {
      image:
      "https://m.media-amazon.com/images/M/MV5BZmUzMWE4ZjMtZTAwMS00MGQ1LWExMGYtMmZmNmVkODFkZmFjXkEyXkFqcGdeQXVyMzQxNTk0ODg@._V1_.jpg",
    id: 2,
    name: "Josefina",
    active: true,
    isOnline: true,
    },
    {
      image:
        "https://img.joomcdn.net/0ac3ab203527eb7c999ee365c7cef1626913f528_original.jpeg",
      id: 3,
      name: "Velazquez",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1351422453973610498/bUspeU1D.jpg",
      id: 4,
      name: "Barrera",
      active: false,
      isOnline: true,
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      allChats: this.allChatUsers,
    };
  }
  render() {
    return (
      <div className="main__chatlist">
        <div className="chatlist__heading"></div>
        <div className="main-avatar">
          <Avatar
                isOnline="active"
                image="https://m.media-amazon.com/images/M/MV5BZmUzMWE4ZjMtZTAwMS00MGQ1LWExMGYtMmZmNmVkODFkZmFjXkEyXkFqcGdeQXVyMzQxNTk0ODg@._V1_.jpg"
              />
              </div>
        <div className="chatList__search">
          <div className="search_wrap">
          <button className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
            </button>
            <input type="text" placeholder="Search or start new chat" required />
          </div>
        </div>
        <div className="chatlist__items">
        <h2 className="chatsText">Chats</h2>
          {this.state.allChats.map((item, index) => {
            return (
              <ChatListItems
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    );
  }
}