import React from "react";
import "./Rentals.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo from "../images/airbnbRed.png";
import { ConnectButton, Icon, Button, useNotification } from "web3uikit";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import User from "../components/User";



const Rentals = () => {
  const { state: searchFilters } = useLocation();
  const [highLight, setHighLight] = useState();
  const { Moralis, account } = useMoralis();
  const [rentalsList, setRentalsList] = useState();
  const [coOrdinates, setCoOrdinates] = useState([]);
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();


  return (
    <>
      <div className="topBanner">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="logo"></img>
          </Link>
        </div>
        <div className="searchReminder">
          <div className="filter">{searchFilters.destination}</div>
          <div className="vl" />
          <div className="filter">
            {`
           ${searchFilters.MetaCheckIN.toLocaleString("default", {
             month: "short",
           })} 
           ${searchFilters.MetaCheckIN.toLocaleString("default", {
             day: "2-digit",
           })} 
           - 
           ${searchFilters.MetaCheckOut.toLocaleString("default", {
             month: "short",
           })} 
           ${searchFilters.MetaCheckOut.toLocaleString("default", {
             day: "2-digit",
           })}
          `}
          </div>
          <div className="vl" />
          <div className="filter">{searchFilters.guests} Guest</div>
          <div className="searchFiltersIcon">
            <Icon fill="#ffffff" size={20} svg="search" />
          </div>
        </div>
        <div className="lrContainers">
          {account &&
          <User account={account} />
        }
          <ConnectButton />
        </div>
      </div>
    </>
  );
};

export default Rentals;
