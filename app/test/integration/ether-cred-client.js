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

var server = {getApprovalsFor, getDisapprovalsFor};

describe('EtherCredUser', function() {
    describe('getCredFor', function() {
        describe('using gravityAlgorithm', function() {
            it('should calculate cred correctly when there are multiple valid paths', function() {

                var userAAddress = 'a', userBAddress = 'b';
                var userA;
                return EtherCredClient.getUser(userAAddress, gravityAlgorithm, server).then(function(user) {
                    userA = user;
                    var actualCred = userA.getCredFor(userBAddress);
                    var expectedCred = (1 / 2) + (1 / 16) - (1 / 4);

                    assert.equal(actualCred, expectedCred);
                });
            });
        });
    });
});
