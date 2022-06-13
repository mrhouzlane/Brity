import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HB from "../images/backG.png"
//import logo from "../images/Logo.png";
import {ConnectButton, Select, DatePicker, Input, Icon} from "web3uikit";
import { useState } from "react";



const Home = () => {
  const [MetaCheckIN, setMetaCheckIN] = useState(new Date());
  const [MetaCheckOut, setMetaCheckOut] = useState(new Date());
  const [destination, setDestination] = useState("Miami");
  const [guests, setGuest] = useState(2);


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
          <Select
              defaultOptionIndex={0}
              onChange={(data) => setDestination(data.labetl)}
              options={[
                {
                  id: 'Mi',
                  label: 'Miami',
                },
                {
                  id: 'CS',
                  label: 'Casablanca',
                },
                {
                  id: 'la',
                  label: 'Los Angeles',
                },
                {
                  id: 'RB',
                  label: 'Rabat',
                },
                {
                  id: 'TG',
                  label: 'Tanger',
                },

              ]}
            />
        </div>
        <div className="vl"/>
        <div className="inputs">
          MetaCheck In 
          <DatePicker
              id="MetaCheckIN"
              onChange={(event) => setMetaCheckIN(event.data)}
            />
        </div>
        <div className="vl"/>
        <div className="inputs">
          MetaCheck Out
          <DatePicker
              id="MetaCheckOut"
              onChange={(event) => setMetaCheckOut(event.data)}
            />
        </div>
        <div className="vl"/>
        <div className="inputs">
          Guests
          <Input
              label="guests"
              type="number"
              onBlur={function noRefCheck(){}}
              onChange={(event)=> setGuest(Number(event.target.value))}
            />
        </div>
        <Link to={"/rentals"} state={{
          destination: destination,
          MetaCheckIN: MetaCheckIN,
          MetaCheckOut: MetaCheckOut,
          guests: guests
        }}>
        <div className="searchButton">
          <Icon fill="#FFFFFF" size={30} svg="search"></Icon>
        </div>
        </Link>
        </div> 
      </div>
    </>

  );
};

export default Home;
