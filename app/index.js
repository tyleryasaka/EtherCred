import {getUser} from './lib/ether-cred-client.js';
import gravityAlgorithm from './lib/gravity-algorithm.js';
import EtherCredServer from './lib/ether-cred-server.js';
import EtherCredContract from '../contracts/EtherCred.sol';
import renderApp from './ui/app.jsx';

require("css!../node_modules/bulma/css/bulma.css");

var Web3 = require("web3");
var accounts;
var account;
var user;

function setupUser() {
    var contract = EtherCredContract.deployed();
    var server = new EtherCredServer(contract);
    getUser(account, gravityAlgorithm, server).then(function(result) {
        user = result;
        renderApp(user);
    });
}

window.addEventListener('load', function() {
  // Supports Metamask and Mist, and other wallets that provide 'web3'.
  if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet provider.
    window.web3 = new Web3(web3.currentProvider);
    EtherCredContract.setProvider(window.web3.currentProvider);

    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      setupUser();
    });
  } else {
    // No web3 detected. Show an error to the user or use Infura: https://infura.io/
    console.error('web3 not detected');
  }
});
