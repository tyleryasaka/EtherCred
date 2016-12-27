const blankAddress = '0x0000000000000000000000000000000000000000';

contract('EtherCred', function(accounts) {
  it("should allow users to create, delete, and view approvals", function() {
    var etherCred = EtherCred.deployed();
    var account_one = accounts[0];
    var account_two = accounts[1];

    return etherCred.approve(account_two, {from: account_one}).then(function() {
        return etherCred.getApprovalsFor(account_one).then(function(result) {
            var approvals = result.valueOf();
            assert.equal(approvals.length, 1, 'There should be 1 approval.');
            assert.equal(approvals[0], account_two, 'The approval should be the approved address.');

            // Try deleting an approval that doesn't exist, to make sure it doesn't throw an error
            etherCred.unapprove(1, {from: account_one});

            return etherCred.unapprove(0, {from: account_one}).then(function() {
                return etherCred.getApprovalsFor(account_one).then(function(result) {
                    var approvals = result.valueOf();
                    assert.equal(approvals.length, 1, 'There should be 1 approval.');
                    assert.equal(approvals[0], blankAddress, 'The approval should be deleted.');
                });
            });
        });
    });
  });
});

contract('EtherCred', function(accounts) {
  it("should have separate approval lists for different addresses", function() {
    var etherCred = EtherCred.deployed();
    var account_one = accounts[0];
    var account_two = accounts[1];
    var account_three = accounts[1];

    return etherCred.approve(account_two, {from: account_one}).then(function() {
        return etherCred.getApprovalsFor(account_three).then(function(result) {
            var approvals = result.valueOf();
            assert.equal(approvals.length, 0, 'There should not be any approvals.');
        });
    });
  });
});

contract('EtherCred', function(accounts) {
  it("should allow users to create, delete, and view disapprovals", function() {
    var etherCred = EtherCred.deployed();
    var account_one = accounts[0];
    var account_two = accounts[1];

    return etherCred.disapprove(account_two, {from: account_one}).then(function() {
        return etherCred.getDisapprovalsFor(account_one).then(function(result) {
            var disapprovals = result.valueOf();
            assert.equal(disapprovals.length, 1, 'There should be 1 disapproval.');
            assert.equal(disapprovals[0], account_two, 'The disapproval should be the disapproved address.');

            // Try deleting a disapproval that doesn't exist, to make sure it doesn't throw an error
            etherCred.undisapprove(1, {from: account_one});

            return etherCred.undisapprove(0, {from: account_one}).then(function() {
                return etherCred.getDisapprovalsFor(account_one).then(function(result) {
                    var disapprovals = result.valueOf();
                    assert.equal(disapprovals.length, 1, 'There should be 1 disapproval.');
                    assert.equal(disapprovals[0], blankAddress, 'The disapproval should be deleted.');
                });
            });
        });
    });
  });
});

contract('EtherCred', function(accounts) {
  it("should have separate disapproval lists for different addresses", function() {
    var etherCred = EtherCred.deployed();
    var account_one = accounts[0];
    var account_two = accounts[1];
    var account_three = accounts[1];

    return etherCred.disapprove(account_two, {from: account_one}).then(function() {
        return etherCred.getDisapprovalsFor(account_three).then(function(result) {
            var disapprovals = result.valueOf();
            assert.equal(disapprovals.length, 0, 'There should not be any disapprovals.');
        });
    });
  });
});
