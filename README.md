# EtherCred

An experimental online credibility network built on [ethereum](https://www.ethereum.org/).

The problem is simple: when we are interacting with other people online, we need a way evaluate their credibility. The solution put forth by EtherCred is a tentatively incentive-compatible system which will require minimal user input and will output, for any given set of 2 users in the system (1 evaluator and 1 evaluatee), a relative score of credibility.

## Why?

EtherCred is inspired by the notion that any truly [*incentive-compatible*](https://en.wikipedia.org/wiki/Incentive_compatibility) system of credibility must be implemented as a graph and produce relative rather than absolute credibility. By incentive-compatible, we mean that manipulation of the system for dishonest purposes should be not be incentivized. We can contrast this to traditional credibility systems, in which universal credibility scores are assigned to each member. While at first this might seem perfectly understandable (perhaps even desirable), at closer inspection this leads to a serious problem.

The problem is deciding how this absolute score should be determined. On one hand, we could respond by saying that a central trusted authority should be responsible for administering these scores. The other possible extreme would be to determine the scores in an entirely democratic fashion, where all users could vote on the credibility of the other users. The problem with the first option - centralizing the score determination - is hopefully clear without explanation. Centralization of authority means that the system can be easily manipulated by a select few. On the other hand, if the scores are determined democratically, there will be an incentive to manipulate the scores using large numbers of dishonest users or bots.

The idea behind EtherCred is to challenge the assumption that credibility must be absolute. Instead, if we allow users to create their own networks of credibility, scores for each *evaluatee* can be determined relative to that user's location on the *evaluator*'s network.

## What?

In the real world, credibility is not universal. If Sue trusts Sam and Sam says Jill is a cool person, that means something to Sue, and Jill has some credibility in Sue's world (though not as much as Sam does). On the other hand, if Jack does not know Sue or Sam, Jill may have no credibility in Jack's world. Or worse yet, Jack may trust Jessica, who claims that Jill is a dishonest person - in which case Jill will have negative credibility in Jack's world. What is true in the world of employment is also somewhat true in the world of credibility: *It's not what you know, it's who you know.*

This idea of relative credibility has powerful implications. It is not fully democratic, in that not everyone has a vote on credibility - *only the people in your network*. For this reason the system is highly resilient to invasions by outsiders with malicious agendas. To gain credibility in a network, users will need to earn the trust of other users. If a user ever engages in suspicious behavior, members of a network can ostracize this user. This provides a mechanism for self-regulation, combining the regulatory power of a central authority with the autonomy of a democracy.

The implementation of the system proposed by EtherCred is quite simple. Each user will have the ability to "trust" other users - a very similar process to following a user on Twitter. Each trusted user will then trust other users, which will trust other users, etc. The net result (no pun intended) will be a graph of users connected to each other by "trusts". In addition to trusts, this concept can be expanded to allow users to add "ostracisms" - a way to explicitly dole out negative credibility.

*TODO: insert diagram of trusts and ostracisms*

Adding trusts and ostracisms, then, are the only actions that users of EtherCred will need to perform. With enough users in the system, complex graphs will be generated. These graphs can be used to calculate the relative credibility scores. There are in fact a number of ways these scores could be calculated, but the general approach would be to determine how "connected" user B (the evaluatee) is to user A (the evaluator). The more connected, the better the credibility. If user B is not at all connected to user A, then user B will have no relative credibility to user A.

EtherCred will tentatively implement the following method to calculate this "connectedness" (warning, things are about to get rather technical and assume some basic understanding of [graph theory](https://en.wikipedia.org/wiki/Graph_theory)):

All the ways in which user B is connected to user A (i.e. all paths from A to B) will be determined. Each path from A to B will be assigned a score; the credibility of user B to user A will be the sum of the scores of the paths from A to B. The score of each path will be determined by the number of vertices in the path, using the following formula:

`score_for_trust_path = 1 / ( 2 ^ ( number_of_vertices - 1 ) )`

Thus if one path from user A to user B includes 5 vertices, the score for that path will be 1/16. This formula is only tentative; the most significant aspect of it is that longer paths produce lower scores, thus weighting the opinions of close friends much higher than the opinions of friends of friends of friends.

We can expand this concept to include "ostracism" vertices. These vertices will be ignored, except those that point to directly to user B. Paths which include these ostracism vertices (as the last vertex in each respective path) will generate scores identical in magnitude to the trust paths, but negated. Thus the formula will be:

`score_for_ostracism_path = - ( 1 / ( 2 ^ ( num_vertices - 1 ) ) )`

This means that ostracism paths will always return negative scores, and that the final credibility score generated by the sum of multiple paths can in fact be negative. In other words, user B could get a negative credibility score relative to user A if the ostracisms outweigh the trusts.

Hopefully some pictures will make this easier to follow:

*TODO: insert diagram of credibility graph with scores*

## How?

The difficulty in implementing the system described above is maintaining the graph in a decentralized manner. After all, one of the inspirations of EtherCred is to minimize dependence on central authorities. In the current state of the internet, this is quite difficult. However, the [ethereum](https://www.ethereum.org/) platform shows promise as a solution to this problem. Ethereum is essentially a giant decentralized virtual machine - a machine that can act as both a database and a server for the EtherCred graph. While the concept of this project does not rely on ethereum, the implementation of it very much does.

The goal of this project is to experimentally implement the system described above as a decentralized application (Dapp) on ethereum.
