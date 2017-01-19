# EtherCred

An experimental online credibility network built on [ethereum](https://www.ethereum.org/).

## Concept

The internet is a chaotic place. Perhaps one of the most challenging aspects of interacting with people online is establishing credibility. If you've ever used Uber, Amazon, AirBnB, or Yelp, you've probably relied on reviews somewhat to help you make a decision. Personally, I use reviews so much that occasionally I catch myself looking for reviews on items in physical stores. :unamused:

In my experience, user reviews are generally pretty good (depending on the website). Taken with a grain of salt, they can help spot both the lemons and the jackpots. However, I have also seen the review system abused. People can be dishonest, and in the back of my mind I am always thinking, "There's a way to make this more reliable."

This idea is purely theoretical, and in that theoretical world I think it makes a lot of sense. That said I have no idea if this idea makes practical sense. In any case, here it is.

The idea is to allow people to create networks of credibility. People in the network are connected by approvals. When Jack approves Jill, she joins his network, as well as everyone in her network based on who she has approved. With this network, it would be possible to derive a credibility score for another person in the network based on how closely associated they are.

![Example Credibility Graph](https://tyleryasaka.me/hosted/ethercred/example-credibility-graph.png)

*Here we see an example network, where the circles are users, green arrows are approvals, and red arrows are disapprovals.*

An important aspect of this is that credibility becomes relative to the observer. Jack may see a certain credibility score for James, who is connected at the 4th degree in his network. Yet Jessica may see an entirely different credibility score for him, because she is connected at the 2nd degree.

The reasoning behind calculating relative scores this way is that it gives each individual user a mechanism for self-regulation of their own network. Ultimately, for bad actors to get into Jill's network, they have to be somehow approved by someone in her network. At any time, she has the ability to take them out of her network by removing her approvals which link them to her. She could also reach out to those people and request that they instead remove the bad actors from their network.

The big caveat here is that there is some apparent effort required by users to make this system work properly. Likely, a lot work would need to be put into designing an interface to the system that gives users a maximum degree of control with a minimum amount of effort.

I'm curently working on defining the mechanics of this system in formal mathematical terms. What I have so far is (an attempt at) a formal description of the algorithm to calculate the credibility score. Eventually I would like to formally describe not only the algorithm, but also the argument for why this idea could be useful. Once I have that, the end result will be a sort of "whitepaper" if you will. Because if there's a whitepaper, you know the idea must be legit. :wink:

[A Graph-Based Credibility Score
Calculation Algorithm](https://tyleryasaka.me/hosted/ethercred/AGraph-BasedCredibilityScoreCalculationAlgorithm.pdf)

## Implementation

One challenge in implementing this system is data integrity. Obviously, all the data could be stored in one place, maintained by a trusted third party. Really though, I think the data should be maintained in a decentralized manner if possible. At first I thought about creating a complex protocol for users to spin up their own servers (or join existing servers), which would all communicate with one another and share data, blah blah blah... But then I realized that the [ethereum](https://www.ethereum.org/) platform could be a much simpler solution to this problem. Ethereum is essentially a giant decentralized virtual machine - a computer that runs its commands and stores its data across an entire network of users. While the overall concept described not rely on ethereum, this particular implementation does. The idea is to create an ethereum contract for maintaining the data, as well as a Ðapp (decentralized application) as an interface for interacting with the contract. Note that the contract is independent from the Ðapp, meaning an infinite number of Ðapps could be built on top of the same contract. The Ðapp created here will just serve as an example.

Hypothetically, once users begin creating networks, various existing applications will have the ability to utilize the network and integrate it with their own user systems. For example, Amazon.com could allow users to associate an EtherCred account with their Amazon account. Then users could view the relative credibility of each reviewer while reading reviews, and possibly even view a weighted star rating of the product, based on the relative credibility of the users that have rated it.

## Development

### Requirements:
- [node](https://github.com/nodejs/node) - version 6.9.1 or greater

### Recommendations:
- [metamask](https://github.com/MetaMask/metamask-plugin) - chrome plugin which allows chrome to browse ethereum apps

### Setup:
- Navigate to the root directory of this repository in your terminal.
- `$ npm install` - yep that simple

### Scripts:
- `$ npm run testrpc` - Boot up the test ethereum blockchain
- `$ npm run dev` - Deploy the contract to the test blockchain and serve the Ðapp on `localhost:8080`. testrpc must be running.
- `$ npm run seed` - Creates some seed data which is handy when browsing the Ðapp. The above 2 scripts must be run first in separate terminals.
- `$ npm test` - Runs both the solidity contract tests (using [truffle](https://github.com/ConsenSys/truffle)) as well as the javascript tests, using [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai). testrpc must be running.

### Browsing the Ðapp locally:
- Get the [metamask](https://github.com/MetaMask/metamask-plugin) chrome plugin
- `$ npm run testrpc`
- `$ npm run dev` (in a separate terminal)
- `$ npm run seed` (in a third terminal)
- Open the metamask plugin in chrome. Change the network to `localhost 8545`. (It is probably set to the Ropsten Test Net by default.)
- One more thing to set up in the metamask plugin: unlock a wallet vault with the mnemonic `engine guard group option ceiling ghost miss jar mask donkey mule betray`. This gives you access to the sample wallets created by the testrpc script.
- Head over to `localhost:8080`. Hopefully you can interact with the Ðapp!
