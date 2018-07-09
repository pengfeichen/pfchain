const Transaction = require('../wallet/transaction');

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(t => t.id === transaction.id);
    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }
  existingTransaction(address) {
    return this.transactions.find(tx => tx.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter(tx => {
      const outputTotal = tx.outputs.reduce((total, output) => {
        return total + output.amount;
      }, 0);
      if (tx.input.amount !== outputTotal) {
        console.log(`Invalid trasaction from ${tx.input.address}.`)
        return;
      }
      if (!Transaction.verifyTransaction(tx)) {
        console.log(`Invalid signature from ${tx.input.address}`)
        return;
      }
      return tx;
    })
  }

  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;