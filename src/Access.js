import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"combinedkey","type":"string"}],"name":"ViewAccess","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"combinedkey","type":"string"},{"name":"hash1","type":"bytes32"},{"name":"hash2","type":"bytes32"}],"name":"GrantAccess","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"combinedkey","type":"string"}],"name":"RevokeAccess","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

var contractAddress = '0x296586cdfafcea0eeea81fd7c0988fd78c631a7f'

var VotingContract = web3.eth.contract(abi);
var contractInstance = VotingContract.at(contractAddress);

export default contractInstance;