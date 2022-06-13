import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HB from "../images/backG.png"
//import logo from "../images/Logo.png";
import {ConnectButton, Select} from "web3uikit";



const Home = () => {

  return (
    <>
      <div className="container" style={{ backgroundImage: `url(${HB})` }}>
        <div className="containerGradient"></div>
      </div>
      <div className="topBanner">
        <div>
        </div>
        <div className="tabs">
          <div className="selected">MetaHomes</div>
          <div> IRL Experiences </div>
          <div> MetaExperiences </div> 
        </div>
        <div className="lrContainers">
        <ConnectButton />
        </div>
      </div>
      <div className="tabContent">
        <div className="searchFields">
        <div className="inputs">
          MetaLocation
        </div>
        <div className="vl"/>
        <div className="inputs">
          MetaCheck In 
        </div>
        <div className="vl"/>
        <div className="inputs">
          MetaCheck Out
        </div>
        <div className="vl"/>
        <div className="inputs">
          Guests
        </div>
        </div> 
      </div>
    </>

  );
};

export default Home;
