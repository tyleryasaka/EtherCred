module.exports = function() {
    // Generates a sample graph
    // Diagram for this graph: http://bit.ly/2hxjqZP
    var graph = {
        'a': {approvals: ['v', 'w'], disapprovals: []},
        'b': {approvals: [], disapprovals: []},
        'm': {approvals: ['n'], disapprovals: ['y']},
        'n': {approvals: [], disapprovals: ['x']},
        'v': {approvals: ['x'], disapprovals: []},
        'w': {approvals: ['b'], disapprovals: []},
        'x': {approvals: ['y'], disapprovals: ['b']},
        'y': {approvals: ['z'], disapprovals: []},
        'z': {approvals: ['b'], disapprovals: []},
    };

    var etherCred = EtherCred.deployed();
    var accountMappings = ['a', 'b', 'm', 'n', 'v', 'w', 'x', 'y', 'z'];
    var accounts = web3.eth.accounts.reduce((accumulator, account, index) => {
        if(accountMappings[index]) {
            accumulator[accountMappings[index]] = account;
        }
        return accumulator;
    }, {});

    function buildApproval(from, to) {
        etherCred.approve(accounts[to], {from: accounts[from]}).then(function() {
            console.log(`approval: ${from} => ${to}`);
        });
    };

    function buildApprovals(address) {
        graph[address].approvals.forEach(function(approval) {
            buildApproval(address, approval);
        });
    }

    function buildDisapproval(from, to) {
        etherCred.disapprove(accounts[to], {from: accounts[from]}).then(function() {
            console.log(`disapproval: ${from} => ${to}`);
        });
    };

    function buildDisapprovals(address) {
        graph[address].disapprovals.forEach(function(disapproval) {
            buildDisapproval(address, disapproval);
        });
    }

    console.log('Here are the accounts addresses:\n');
    console.log(accounts);
    console.log('\nBuilding seed graph...');
    console.log('Diagram at http://bit.ly/2hxjqZP\n');
    Object.keys(graph).forEach(buildApprovals);
    Object.keys(graph).forEach(buildDisapprovals);
};
