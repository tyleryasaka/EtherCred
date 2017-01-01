const blankAddress = '0x0000000000000000000000000000000000000000';

function indexOf(item, list) {
    var index = -1;
    list.forEach((listItem, listIndex) => {
        if(item === listItem) {
            index = listIndex;
        }
    });
    return index;
}

// TODO: test this
function EtherCredServer(deployedContract) {
    this.getApprovalsFor = function(requesterAddress) {
        return deployedContract.getApprovalsFor(requesterAddress).then(function(approvals) {
            var filteredApprovals = [];
            for(var a = 0; a < approvals.length; a++) {
                if(approvals[a] !== blankAddress) {
                    filteredApprovals.push(approvals[a]);
                }
            }
            return filteredApprovals;
        });
    };

    this.approve = function(requesterAddress, targetAddress) {
        return deployedContract.approve(targetAddress, {from: requesterAddress});
    };

    this.unapprove = function(requesterAddress, targetAddress) {
        return deployedContract.getApprovalsFor(requesterAddress).then(function(approvals) {
            var index = indexOf(targetAddress, approvals);
            return deployedContract.unapprove(index, {from: requesterAddress});
        });
    };

    this.getDisapprovalsFor = function(requesterAddress) {
        return deployedContract.getDisapprovalsFor(requesterAddress).then(function(disapprovals) {
            var filteredDisapprovals = [];
            for(var a = 0; a < disapprovals.length; a++) {
                if(disapprovals[a] !== blankAddress) {
                    filteredDisapprovals.push(disapprovals[a]);
                }
            }
            return filteredDisapprovals;
        });
    };

    this.disapprove = function(requesterAddress, targetAddress) {
        return deployedContract.disapprove(targetAddress, {from: requesterAddress});
    };

    this.undisapprove = function(requesterAddress, targetAddress) {
        return deployedContract.getDisapprovalsFor(requesterAddress).then(function(disapprovals) {
            var index = indexOf(targetAddress, disapprovals);
            return deployedContract.undisapprove(index, {from: requesterAddress});
        });
    };
}

export default EtherCredServer;
