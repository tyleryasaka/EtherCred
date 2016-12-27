pragma solidity ^0.4.2;

contract EtherCred {
    struct Citizen {
        address[] approvals;
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
}
