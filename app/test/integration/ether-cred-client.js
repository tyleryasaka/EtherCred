var assert = chai.assert;

var users = {
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

var getApprovalsFor = function(userId) {
    return Promise.resolve(users[userId].approvals);
};

var getDisapprovalsFor = function(userId) {
    return Promise.resolve(users[userId].disapprovals);
};

describe('EtherCredClient', function() {
    describe('evaluate', function() {
        describe('using gravityAlgorithm', function() {
            it('should calculate cred correctly when there are multiple valid paths', function(done) {
                var userAAddress = 'a', userBAddress = 'b';
                var userA = new EtherCredClient(userAAddress, getApprovalsFor, getDisapprovalsFor, gravityAlgorithm, buildGraph, getCred, function() {
                    var actualCred = userA.getCredFor(userBAddress);
                    var expectedCred = (1 / 2) + (1 / 16) - (1 / 4);

                    assert.equal(actualCred, expectedCred);
                    done();
                });
            });
        });
    });
});
