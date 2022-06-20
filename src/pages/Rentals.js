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
  const [rentalsList, setRentalsList ] = useState();
  

  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();


  const handleSuccess= () => {
    dispatch({
      type: "success",
      message: `Nice! You are going to ${searchFilters.destination}!!`,
      title: "Booking Succesful",
      position: "topL",
    });
  };

  const handleError= (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Booking Failed",
      position: "topL",
    });
  };

  const handleNoAccount= () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to book a rental`,
      title: "Not Connected",
      position: "topL",
    });
  };


  useEffect(() => {
    async function fetchRentalsList() {
      const webEvents = Moralis.Object.extend("webevents");
      const query = new Moralis.Query(webEvents);
      query.equalTo("city", searchFilters.destination);
      //query.greaterThanOrEqualTo("maxTeamFormation_decimal", searchFilters.TeamFormation);

      const result = await query.find();

      setRentalsList(result);
    }

    fetchRentalsList();
  }, [searchFilters]);


  const bookRental = async function (start, end, id, pricing) {
    
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt).toISOString().slice(0, 10)); // yyyy-mm-dd
    }

    let options = {
      contractAddress: "0xa5d6fA2823c9F2122FbBB728B1B989d487F4DCc9",
      functionName: "addDatesBooked",
      abi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "newBookings",
              "type": "string[]"
            }
          ],
          "name": "addDatesBooked",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ],
      params: {
        id: id,
        newBookings: arr,
      },
      msgValue: Moralis.Units.ETH(pricing * arr.length),
    }
    console.log(arr);

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleSuccess();
      },
      onError: (error) => {
        handleError(error.data.message)
      }
    });

  }


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
          <div className="filter">{searchFilters.TeamFormation}</div>
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

      <hr className="line" />
      <div className="rentalsContent">
        <div className="rentalsContentL">
          WEB3 EVENTS 
          {rentalsList &&
            rentalsList.map((e, i) => {
              return (
                <>
                  <hr className="line2" />
                  <div className={highLight === i ? "rentalDivH " : "rentalDiv"}>
                    <img className="rentalImg" src={e.attributes.Logo}></img>
                    <div className="rentalInfo">
                      <div className="rentalTitle">{e.attributes.name}</div>
                      <div className="rentalDesc">
                        {e.attributes.Description}
                      </div>
                     
                      <div className="bottomButton">
                        <Button 
                        onClick={() => {
                          if(account){
                          bookRental(
                            searchFilters.MetaCheckIN,
                            searchFilters.MetaCheckOut,
                            e.attributes.uid_decimal.value.$numberDecimal,
                            Number(e.attributes.pricing_decimal.value.$numberDecimal)
                          )}else{
                            handleNoAccount()
                          }
                        }
                        }
                        text="Stay Here" />
                        <div className="price">
                          <Icon fill="#808080" size={10} svg="matic" />{" "}
                          {e.attributes.pricing} / Day
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
       
      </div>
    </>
  );
};

export default Rentals;