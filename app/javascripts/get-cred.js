var getCred = function(graph, jackId, jillId, weightingAlgorithm) {
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
