// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Brity {

    address public owner;
    uint256 private counter;

    struct Web3ExperienceInfo {
        string name;
        string city;
        //string lat;
        //string long;
        string Description;
        uint256 Prizes; 
        string Logo;
        uint256 TeamFormation;
        uint256 pricing;
        string[] datesBooked;
        uint256 id;
        address participant;
    }

    event Web3ExperienceCreated (
        string name,
        string city,
        //string lat,
        //string long,
        string Description,
        uint256 Prizes,
        string Logo,
        uint256 TeamFormation,
        uint256 pricing,
        string[] datesBooked,
        uint256 id,
        address participant
    );
    
    event newDatesBooked (
        string[] datesBooked, 
        uint256 id,
        address participant,
        string city,
        string Logo
    );

    mapping(uint256 => Web3ExperienceInfo) Web3Experiences; 
    uint256[] public Web3ExperiencesIds; 

    function addWeb3Experience(
        string memory name,
        string memory city,
        //string memory lat,
        //string memory long,
        string memory Description,
        uint256 Prizes,
        string memory Logo,
        uint256 TeamFormation,
        uint256 pricing,
        string[] memory datesBooked,
        uint256 id,
        address participant) public {

            require(msg.sender == owner, "Only owner of smart contract add Web3Experiences");
            Web3ExperienceInfo storage newExp = Web3Experiences[counter];
            newExp.name = name;  
            newExp.city = city;
            //newExp.lat = lat;
            //newExp.long = long;
            newExp.Description = Description;
            newExp.Prizes = Prizes;
            newExp.Logo = Logo; 
            newExp.participant = participant;
            newExp.pricing = pricing;
            newExp.datesBooked = datesBooked; 
            newExp.id = counter; 
            newExp.participant = owner; 
            Web3ExperiencesIds.push(counter);
            emit Web3ExperienceCreated(
                name,
                city,
                //lat,
                //long,
                Description,
                Prizes,
                Logo,
                TeamFormation,
                pricing,
                datesBooked,
                counter,
                owner);
            counter++;
              
    }

    function checkBookings(uint256 id, string[] memory newBookings) private view returns (bool) {

        for (uint i=0; i < newBookings.length; i++) {
            for (uint j=0; j < Web3Experiences[id].datesBooked.length; j++) {
                if (keccak256(abi.encodePacked(Web3Experiences[id].datesBooked[j])) == keccak256(abi.encodePacked(newBookings[i])))
                    return false;
            }
        }
    }

    function addDatesBooked(uint256 id, string[] memory newBookings) public payable {
        require(id < counter, "Rental not available");
        require(checkBookings(id, newBookings), "Already booked");
        require(msg.value == (Web3Experiences[id].pricing * 1 ether * newBookings.length), "Please submit the asking price in order to complete the purchase");

        for (uint i = 0; i < newBookings.length; i++){
            Web3Experiences[id].datesBooked.push(newBookings[i]);
        }

        payable(owner).transfer(msg.value);
        emit newDatesBooked(newBookings, id, msg.sender, Web3Experiences[id].city,  Web3Experiences[id].Logo);

    }

    function getRental(uint256 id) public view returns (string memory, uint256, string[] memory){
        require(id < counter, "No such Rental");

        Web3ExperienceInfo storage s = Web3Experiences[id];
        return (s.name,s.pricing,s.datesBooked);
    }

    





}
