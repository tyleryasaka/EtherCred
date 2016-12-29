var assert = chai.assert;

// Diagram for this graph: https://docs.google.com/document/d/11JxdyVDxWX2J4XBbUiPDWdAkqLgCrJ2F_cc1uBqJlBI/edit?usp=sharing
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

var trivialAlgorithm = function(edges) {
    return edges;
};

describe('getCred', function() {
    describe('with a trivial weighting algorithm', function() {
        it('should return a score of 1 for user directly connected by an approval (with no other connections)', function() {
            var userY = 'y', userZ = 'z';

            var actualCred = getCred(graph, userY, userZ, trivialAlgorithm);
            var expectedCred = 1;

            assert.equal(actualCred, expectedCred);
        });

        it('should return a score of 0 for unconnected user', function() {
            var userA = 'a', userB = 'b';

            var actualCred = getCred(graph, userB, userA, trivialAlgorithm);
            var expectedCred = 0;

            assert.equal(actualCred, expectedCred);
        });

        it('should ignore all paths which include disapprovals unless the disapproval is the last edge', function() {
            var userB = 'b', userM = 'm';

            var actualCred = getCred(graph, userM, userB, trivialAlgorithm);
            var expectedCred = 0;

            assert.equal(actualCred, expectedCred);
        });

        it('should return a negative score when the only path is a disapproval path', function() {
            var userM = 'm', userX = 'x';

            var actualCred = getCred(graph, userM, userX, trivialAlgorithm);
            var expectedCred = -2;

            assert.equal(actualCred, expectedCred);
        });

        it('should calculate cred correctly when there are multiple valid paths', function() {
            var userA = 'a', userB = 'b';

            var actualCred = getCred(graph, userA, userB, trivialAlgorithm);
            var expectedCred = 2 + 5 - 3;

            assert.equal(actualCred, expectedCred);
        });
    });
});
