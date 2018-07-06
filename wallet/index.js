const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-util');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publickKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet - 
    publicKey : ${this.publickKey.toString()}
    balance   : ${this.balance}`
  }
}

module.exports = Wallet;