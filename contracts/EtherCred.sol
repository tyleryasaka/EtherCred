pragma solidity ^0.4.2;

contract EtherCred {
    struct Citizen {
        address[] approvals;
        address[] disapprovals;
    }

    mapping(address => Citizen) citizens;

    function approve(address _target) {
        citizens[msg.sender].approvals.push(_target);
    }

    function unapprove(uint _index) {
        if(_index < citizens[msg.sender].approvals.length) {
            delete citizens[msg.sender].approvals[_index];
        }
    }

    function getApprovalsFor(address _target) constant returns (address[]) {
        return citizens[_target].approvals;
    }

    function disapprove(address _target) {
        citizens[msg.sender].disapprovals.push(_target);
    }

    function undisapprove(uint _index) {
        if(_index < citizens[msg.sender].disapprovals.length) {
            delete citizens[msg.sender].disapprovals[_index];
        }
    }

    function getDisapprovalsFor(address _target) constant returns (address[]) {
        return citizens[_target].disapprovals;
    }
}
