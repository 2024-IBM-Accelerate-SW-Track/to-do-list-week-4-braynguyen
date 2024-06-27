import React, { Component } from 'react';
import "./About.css";
import profile_pic from "../assets/pfp.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        <div className="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            />
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Brayden Nguyen</div>
            <div className="brief_description">
                Hi, my name is Brayden and I am a second year CS student at Pitt and a SWE intern at IBM. Also, I do not have middle fingers.
            </div>
          </div>
        </div>
      </div>
    )
  }
}