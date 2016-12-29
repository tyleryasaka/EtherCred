function EtherCredClient(userAddress, getApprovalsFor, getDisapprovalsFor, gravityAlgorithm, buildGraph, getCred, onBuiltGraph) {
    var client = this;

    this.userAddress = userAddress;
    this.weightingAlgorithm = gravityAlgorithm;

    this.getCredFor = function(addressOfUserToEvaluate) {
        return getCred(this.graph, this.userAddress, addressOfUserToEvaluate, this.weightingAlgorithm);
    };

    buildGraph(getApprovalsFor, getDisapprovalsFor, userAddress).then(function(graph) {
        client.graph = graph;
        onBuiltGraph();
    });
}
