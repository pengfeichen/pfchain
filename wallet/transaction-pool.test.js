const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let tp, wallet, transaction;
  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = wallet.createTransaction('randomaddress', 30, tp)
  })

  it('adds a transaction to the pool', () => {
    expect(tp.transactions.find(tx => tx.id === transaction.id)).toBe(transaction);
  })

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransation = transaction.update(wallet, 'newaddress', 10);
    tp.updateOrAddTransaction(transaction);

    expect(JSON.stringify(tp.transactions.find(tx => tx.id === newTransation.id))).not.toEqual(oldTransaction)
  })

  describe('mixing corrupt and valid transactions', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...tp.transactions];
      for (let i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('anotherrndomadgress', 30, tp);
        if (i % 2 == 0) {
          transaction.input.amount = 99999;
        } else {
          validTransactions.push(transaction)
        }
      }
    })

    it('shows a difference between valid and corrupt transactions', ()=>{
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions))
    })

    it('grabs valid transactions', ()=>{
      expect(tp.validTransactions()).toEqual(validTransactions);
    })
  })

})