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
  const [destination, setDestination] = useState("New York");
  const [TeamFormation, setTeamFormation] = useState(2);


  return (
    <>
      <div className="container" style={{ backgroundImage: `url(${HB})` }}>
        <div className="containerGradient"></div>
      </div>
      <div className="topBanner">
        <div>
        </div>
        <div className="tabs">
          <div className="selected">Web3 Experiences</div>
          <div> Web3 Hacks </div>
          <div> IPFS </div> 
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
                  id: 'NY',
                  label: 'New York',
                },
                {
                  id: 'SB',
                  label: 'Solana Bootcamp',
                },
                {
                  id: 'Tz',
                  label: 'Tezos Hack',
                },
                {
                  id: 'Sp',
                  label: 'Supernova Hack',
                },
                {
                  id: 'Sk',
                  label: 'Starknet Hack',
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
          Team Formation
          <Input
              label=""
              type="number"
              onBlur={function noRefCheck(){}}
              onChange={(event)=> setTeamFormation(Number(event.target.value))}
            />
        </div>
        <Link to={"/rentals"} state={{
          destination: destination,
          MetaCheckIN: MetaCheckIN,
          MetaCheckOut: MetaCheckOut,
          TeamFormation: TeamFormation
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