var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/65f7c212de8546e18a393f3282a6e009');
const acc1 = '0x084150f58b6A23c74Cf25e225db7041047CdDfDD';
const acc2 = '0xc33240ab7b8e214A5515f591cC59f1Af6257d264';
const privkey1 = Buffer.from(process.env.PRIVATE_KEY_1.split('x').pop(),'hex')
const privkey2 = Buffer.from(process.env.PRIVATE_KEY_2.split('x').pop(),'hex')
console.log(privkey1)
console.log(privkey2)
 web3.eth.getBalance(acc1, (err, result)=>{console.log(web3.utils.fromWei(result, 'ether'));
 });
 web3.eth.getTransactionCount(acc1, (error, txnCount)=> {
    const txnObject={
        nonce:web3.utils.toHex(txnCount) ,
        to: acc2,
        value:web3.utils.toHex(web3.utils.toWei('1', 'ether')) ,
        gasLimit:web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei'))
     }
     console.log(txnObject)
     const tx = new Tx(txnObject,{'chain':'ropsten'})
     tx.sign(privkey1)
     //console.log("tx: ",tx);
     const serializedTransactions = tx.serialize()
     console.log("serializedtrans:",serializedTransactions)
     const raw = '0x'+ serializedTransactions.toString('hex')
    console.log(raw);
     web3.eth.sendSignedTransaction(raw,(err,txnHash)=>{
        console.log('txnHash:',txnHash);
     })
       
 });
 
 
 web3.eth.getBalance(acc2, (error, result)=> {
    console.log(web3.utils.fromWei(result,'ether'))
 });