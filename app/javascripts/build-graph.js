var buildGraph = function(getApprovalsFor, getDisapprovalsFor, userId) {
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
