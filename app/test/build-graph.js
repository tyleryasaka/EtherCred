var assert = chai.assert;

describe('buildGraph', function() {
    it('should build the correct graph', function() {
        var users = {
            'a': {approvals: ['b', 'c'], disapprovals: ['d']},
            'b': {approvals: ['a'], disapprovals: ['d']},
            'c': {approvals: ['d'], disapprovals: []},
            'd': {approvals: ['c'], disapprovals: ['b']},
            'e': {approvals: ['d'], disapprovals: ['a']}
        };

        var getApprovalsFor = function(userId) {
            return Promise.resolve(users[userId].approvals);
        };

        var getDisapprovalsFor = function(userId) {
            return Promise.resolve(users[userId].disapprovals);
        };

        var userA = 'a';
        var expectedGraph = {
            'a': {approvals: ['b', 'c'], disapprovals: ['d']},
            'b': {approvals: ['a'], disapprovals: ['d']},
            'c': {approvals: ['d'], disapprovals: []},
            'd': {approvals: ['c'], disapprovals: ['b']}
        };

        return buildGraph(getApprovalsFor, getDisapprovalsFor, userA).then(function (actualGraph) {
            return assert.deepEqual(actualGraph, expectedGraph);
        });
    });
});
