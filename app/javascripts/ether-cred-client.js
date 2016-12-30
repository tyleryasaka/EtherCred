function EtherCredUser(address, weightingAlgorithm, server) {
    this.address = address;
    this.weightingAlgorithm = weightingAlgorithm;
    this.server = server;
    this.graph = undefined;
    this.approvals = undefined;
    this.disapprovals = undefined;

    this.loadGraph = () => {
        return buildGraph(this.server.getApprovalsFor, this.server.getDisapprovalsFor, this.address).then(graph => {
            this.graph = graph;
            this.approvals = this.graph[this.address].approvals;
            this.disapprovals = this.graph[this.address].disapprovals;
        });
    };

    this.approve = (targetAddress) => {
        return this.server.approve(this.address, targetAddress).then(this.loadGraph);
    };

    this.unapprove = (targetAddress) => {
        return this.server.unapprove(this.address, targetAddress).then(this.loadGraph);
    };

    this.disapprove = (targetAddress) => {
        return this.server.disapprove(this.address, targetAddress).then(this.loadGraph);
    };

    this.undisapprove = (targetAddress) => {
        return this.server.undisapprove(this.address, targetAddress).then(this.loadGraph);
    };

    this.getCredFor = (addressOfUserToEvaluate) => {
        return getCred(this.graph, this.address, addressOfUserToEvaluate, this.weightingAlgorithm);
    };
}

function getUser(userAddress, weightingAlgorithm, server) {
    var user = new EtherCredUser(userAddress, weightingAlgorithm, server);
    return user.loadGraph().then(() => {
        return user;
    });
}

function buildGraph(getApprovalsFor, getDisapprovalsFor, userId) {
    var graph = {};

    function register(userId, approvals, disapprovals) {
        if(!isRegistered(userId)) {
            graph[userId] = {approvals, disapprovals};
        }
    }

    function isRegistered(userId) {
        return graph[userId] ? true : false;
    }

    function executeQueue(queue) {
        if(queue.length) {
            var nextUser = queue.shift();
            return help(nextUser).then(function() {
                return executeQueue(queue);
            });
        } else {
            return graph;
        }
    }

    function help(userId) {
        var queue = [];

        return getApprovalsFor(userId).then(function(approvals) {
            return getDisapprovalsFor(userId).then(function(disapprovals) {
                register(userId, approvals, disapprovals);

                for(var a = 0; a < approvals.length; a++) {
                    if(!isRegistered(approvals[a])) {
                        queue.push(approvals[a]);
                    }
                }

                for(var d = 0; d < disapprovals.length; d++) {
                    if(!isRegistered(disapprovals[d])) {
                        queue.push(disapprovals[d]);
                    }
                }

                return executeQueue(queue);
            });
        });
    };

    return help(userId);
};

function getCred(graph, jackId, jillId, weightingAlgorithm) {
    function getTotalScore() {
        var paths = getPaths();
        return getScoreForType(paths, 'approval') - getScoreForType(paths, 'disapproval');
    }

    function getScoreForType(allPaths, type) {
        var filteredPaths = filterPathsByType(allPaths, type);
        var sum = 0;
        for(var p = 0; p < filteredPaths.length; p++) {
            var path = filteredPaths[p];
            var edgeCount = countEdges(path);
            sum += weightingAlgorithm(edgeCount);
        }
        return sum;
    }

    function getPaths() {
        var paths = [];

        function pathHasCycled(path) {
            var lastVertex = path[path.length - 1];
            var hasCycled = false;
            for(var i = 0; i < path.length - 2; i++) {
                if(path[i] === lastVertex) {
                    hasCycled = true;
                }
            }
            return hasCycled;
        }

        function buildPath(currentPath, userId, type) {
            currentPath.push(userId);
            if(userId === jillId) {
                paths.push({vertices: currentPath, type: type});
            } else if(!pathHasCycled(currentPath) && type === 'approval') { // TODO test graph with cycles
                var approvals = graph[userId].approvals;
                var disapprovals = graph[userId].disapprovals;
                for(var a = 0; a < approvals.length; a++) {
                    var currentPathCopy = currentPath.slice(0);
                    buildPath(currentPathCopy, approvals[a], 'approval');
                }
                for(var d = 0; d < disapprovals.length; d++) {
                    var currentPathCopy = currentPath.slice(0);
                    buildPath(currentPathCopy, disapprovals[d], 'disapproval');
                }
            }
        }

        buildPath([], jackId, 'approval');

        return paths;
    }

    function filterPathsByType(pathSet, type) {
        var filteredPaths = [];
        for(var p = 0; p < pathSet.length; p++) {
            if(pathSet[p].type === type) {
                filteredPaths.push(pathSet[p]);
            }
        }
        return filteredPaths;
    }

    function countEdges(path) {
        return path.vertices.length - 1;
    }

    return getTotalScore();
};

export { getUser, buildGraph, getCred };
