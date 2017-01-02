var chai = require('chai');
var assert = chai.assert;

import {getUser} from '../../../app/lib/ether-cred-client.js';
import gravityAlgorithm from '../../../app/lib/gravity-algorithm.js';

var users;

var getApprovalsFor = function(userId) {
    return Promise.resolve(users[userId].approvals);
};

var getDisapprovalsFor = function(userId) {
    return Promise.resolve(users[userId].disapprovals);
};

var approve = function(requesterId, targetId) {
    users[requesterId].approvals[targetId] = true;
    return Promise.resolve();
}

var unapprove = function(requesterId, targetId) {
    delete users[requesterId].approvals[targetId];
    return Promise.resolve();
}

var disapprove = function(requesterId, targetId) {
    users[requesterId].disapprovals[targetId] = true;
    return Promise.resolve();
}

var undisapprove = function(requesterId, targetId) {
    delete users[requesterId].disapprovals[targetId];
    return Promise.resolve();
}

var server = {getApprovalsFor, getDisapprovalsFor, approve, unapprove, disapprove, undisapprove};

describe('EtherCredUser', function() {
    describe('getCredFor', function() {
        describe('using gravityAlgorithm', function() {
            it('should calculate cred correctly when there are multiple valid paths', function() {
                users = {
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

                var userAAddress = 'a', userBAddress = 'b';
                var userA;
                return getUser(userAAddress, gravityAlgorithm, server).then(function(user) {
                    userA = user;
                    var actualCred = userA.getCredFor(userBAddress);
                    var expectedCred = (1 / 2) + (1 / 16) - (1 / 4);

                    assert.equal(actualCred, expectedCred);
                });
            });
        });
    });

    describe('approve', function() {
        it('should add the target user to the requester\'s approval list', function() {
            users = {
                'a': {approvals: {}, disapprovals: {}},
                'b': {approvals: {}, disapprovals: {}}
            };

            var userAAddress = 'a', userBAddress = 'b';
            var userA;
            return getUser(userAAddress, gravityAlgorithm, server).then(function(user) {
                userA = user;
                return userA.approve(userBAddress).then(function() {
                    var isActuallyApproved = userA.approvals[userBAddress];
                    assert.equal(isActuallyApproved, true);
                });
            });
        });
    });

    describe('unapprove', function() {
        it('should remove the target user from the requester\'s approval list', function() {
            users = {
                'a': {approvals: {'b': true}, disapprovals: {}},
                'b': {approvals: {}, disapprovals: {}}
            };

            var userAAddress = 'a', userBAddress = 'b';
            var userA;
            return getUser(userAAddress, gravityAlgorithm, server).then(function(user) {
                userA = user;
                return userA.unapprove(userBAddress).then(function() {
                    assert.deepEqual(userA.approvals, {});
                });
            });
        });
    });

    describe('disapprove', function() {
        it('should add the target user to the requester\'s disapproval list', function() {
            users = {
                'a': {approvals: {}, disapprovals: {}},
                'b': {approvals: {}, disapprovals: {}}
            };

            var userAAddress = 'a', userBAddress = 'b';
            var userA;
            return getUser(userAAddress, gravityAlgorithm, server).then(function(user) {
                userA = user;
                return userA.disapprove(userBAddress).then(function() {
                    var isActuallyDisapproved = userA.disapprovals[userBAddress];
                    assert.equal(isActuallyDisapproved, true);
                });
            });
        });
    });

    describe('undisapprove', function() {
        it('should remove the target user from the requester\'s disapproval list', function() {
            users = {
                'a': {approvals: {}, disapprovals: {'b': true}},
                'b': {approvals: {}, disapprovals: {}}
            };

            var userAAddress = 'a', userBAddress = 'b';
            var userA;
            return getUser(userAAddress, gravityAlgorithm, server).then(function(user) {
                userA = user;
                return userA.undisapprove(userBAddress).then(function() {
                    assert.deepEqual(userA.disapprovals, {});
                });
            });
        });
    });
});
