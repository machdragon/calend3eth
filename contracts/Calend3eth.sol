// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calend3eth {
    uint rate;
    address payable public owner;

    struct Appointment {
    string title;     // title of the meeting
    address attendee; // person you are meeting
    uint startTime;   // start time of meeting
    uint endTime;     // end time of the meeting
    uint amountPaid;  // amount paid for the meeting
    }

    Appointment[] appointments;

    constructor() {
        owner = payable(msg.sender);
    }

    function getRate() public view returns (uint) {
        return rate;
    }

    function setRate(uint _rate) public {
        require(msg.sender == owner, "Only the owner can set the rate");
        rate = _rate;
    }

    // when returning string needs to allocate temporary place to store data
    // we do this with the memory keyword in Solidity
    function getAppointments() public view returns (Appointment[] memory) {
        return appointments;
    }

    function createAppointment(string memory title, uint startTime, uint endTime) public payable {
        Appointment memory appointment;
        appointment.title = title;
        appointment.startTime = startTime;
        appointment.endTime = endTime;
        appointment.amountPaid = ((endTime - startTime) / 60) * rate;
        appointment.attendee = msg.sender; // address of person calling contract

        require(msg.value >= appointment.amountPaid, "We require more ether"); // validate the amount of ETH

        (bool success,) = owner.call{value: msg.value}(""); // send ETH to the owner
        require(success, "Failed to send Ether");

        appointments.push(appointment);
    }
}