# EtherCred

An experimental online credibility network built on [ethereum](https://www.ethereum.org/).

The problem is simple: when we are interacting with other people online, we need a way evaluate their credibility. The solution put forth by EtherCred is a system which will require minimal user input and will output, for any given set of 2 users in the system (1 user observing and 1 user being observed), a relative score of credibility.

## Why?

Why not?

Actually, there might be a couple of benefits to a graph-based relative credibility system. It's an interesting concept because the system is not fully democratic, in that not everyone has a vote on the credibility scores that Jack sees - *only the people in Jack's network*. For this reason the system might be resilient to invasions by outsiders with malicious agendas. To gain credibility in a network, users will need to earn the trust of other users. If a user ever engages in suspicious behavior, members of a network can ostracize this user. This provides a mechanism for self-regulation.

Yet even though the system is not strictly democratic, it remains decentralized. No member of the system has any more power than any other member of the system. There are no designated admins or regulators - *the users are their own regulators*.

## So... what are we talking about here?

EtherCred is attempt to prototype a relative (rather than absolute) credibility system. Most online credibility systems currently in existence use absolute scores to measure credibility - whether that score is measured in points or stars or zebras.

But in real life, is credibility really ever absolute? Maybe not.

If Sue trusts Sam and Sam says Jill is a cool person, that means something to Sue, and Jill has some credibility in Sue's world (though not as much as Sam does). On the other hand, if Jack does not know Sue or Sam, Jill may have no credibility in Jack's world. Or worse yet, Jack may trust Jessica, who claims that Jill is a dishonest person - in which case Jill will have negative credibility in Jack's world. Jake and Jill aside, the point is that in the real world, credibility is relative to the observer.

In more detail, the way credibility is determined goes something like this: the observer (let's call him Jack) has a list of people he trusts. Perhaps one of those people is Jill. Jill also has a list of people she trusts, and each of those people has a list of people they trust, each of which has a list of people they trust, and so forth. The end result, from Jack's perspective, is a giant network with him at the center. Just around the center are the people Jack trust's the most, and around them are the people they trust. The further from the center you go, the more distantly connected they are to Jack. While Jack might highly trust someone close to the center, he might be skeptical of someone further out, and entirely untrusting of someone not in his network at all.

This is an oversimplification obviously, but hopefully it is a good starting point. With some fairly simple math and a little graph theory, we can take this network concept and actually generate real credibility scores for how much Jack ought to trust any given person, based on who is in his network.

## How?

### Algorithm

Here are the technical details of how EtherCred will be implemented, in the algorithmic sense:

Each user in EtherCred will have the ability to "approve" other users - a very similar process to following a user on Twitter. Each approved user will then approve other users, which will approve other users, etc. The net result (pun appreciated but not intended) will be a graph of users connected to each other by these "approvals".

With these approvals in place, then, we can calculate a score for a given pair of (Jack, Jill) where Jack is the one trying to determine the credibility of Jill. There are a number of ways this could be done. Below is a description of the tentative algorithm that EtherCred will use:

We will find all the ways Jill is connected to Jack through approvals (there could be none or multiple), and for each one, we will count the number of [vertices](https://en.wikipedia.org/wiki/Vertex_(graph_theory)) between them. The credibility for that path, then, is determined by this formula:

`credibility = 1 / ( 2 ^ ( number_of_vertices - 1 ) )`

Once we've calculated the credibility for each path, we just add up the results. The sum will be the credibility of Jill to Jack.

*TODO: summarize this with a math formula*

*TODO: include a pretty diagram*

We can even extend the concept to allow users to "disapprove" other users. *TODO: explain how this works*

In the end, then, all Jack has to do is approve and disapprove other users. The algorithm will look at the generated graph and use it to calculate credibility scores for other users relative to Jack, and he can resume tumbling down hills with Jill (who he now knows with certain probability is trustworthy).

### Implementation

The difficulty in implementing the system described above is maintaining the graph in a decentralized manner. After all, one of the aspirations of EtherCred is decentralization. In the current state of the internet, data resides on centralized servers that have to be owned and maintained by an individual or organization. However, the [ethereum](https://www.ethereum.org/) platform shows promise as a solution to this problem. Ethereum is essentially a giant decentralized virtual machine - a machine that can act as both a database and a server for the EtherCred graph. While the concept of this project does not rely on ethereum, the implementation of this prototype does.

## Development

### Requirements:
- [node](https://github.com/nodejs/node) - version ^6.9.1 needed if you use `testrpc` (see below)
- [truffle](https://github.com/ConsenSys/truffle) - framework for developing dapps on ethereum

### Recommendations:
- [testrpc](https://github.com/ethereumjs/testrpc) - server for running a fake ethereum blockchain locally
- [mist](https://github.com/ethereum/mist) - ethereum dapp browser

### Running the truffle tests for the [solidity](https://solidity.readthedocs.io/en/develop/) contracts

The truffle tests are located in the `test` directory. Read the truffle docs for more info.

1. Run `$ testrpc` to start the testrpc server
2. In another terminal window, run `$ truffle test`

### Running the browser tests for the javascript code

The browser tests are located in the `app/test` directory. They use [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai).

1. Open the `test.html` file in a plain-ole browser (not Mist - just Chrome or Firefox or whatever you use)
2. Uh, yeah... that's all you should have to do. The page will tell you how the tests are doing. The page uses CDNs so you will need an internet connection.

More to come...
