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
