var assert = chai.assert;

describe('gravityAlgorithm', function() {
    it('should return a weight of 1 for 1 edge', function() {
        assert.equal(1, gravityAlgorithm(1));
    });

    it('should return a weight of 1/2 for 2 edges', function() {
        assert.equal((1 / 2), gravityAlgorithm(2));
    });

    it('should return a weight of 1/4 for 3 edges', function() {
        assert.equal((1 / 4), gravityAlgorithm(3));
    });

    it('should return a weight of 1/8 for 4 edges', function() {
        assert.equal((1 / 8), gravityAlgorithm(4));
    });

    it('should return a weight of 1/16 for 5 edges', function() {
        assert.equal((1 / 16), gravityAlgorithm(5));
    });

    it('should return a weight of 1/1024 for 11 edges', function() {
        assert.equal((1 / 1024), gravityAlgorithm(11));
    });
});
