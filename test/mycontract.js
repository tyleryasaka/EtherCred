contract('MyContract', function(accounts) {
  it("should do something", function() {
    var myContract = MyContract.deployed();

     assert.equal(1 + 1, 2, "Always good to verify your assumptions.");
  });
});
