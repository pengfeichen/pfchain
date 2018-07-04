const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let bc, bc2;
  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('start with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis())
  })

  it('adds a new block', () => {
    const data = 'data';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  })

  it('should validate the gensis block', () => {
    bc.addBlock(Block.genesis())
    expect(bc.isValidChain(bc.chain))
  })

  it('should validate a blockchain of size 2', () => {
    const data1 = 'data';
    const data2 = 'data2';
    bc.addBlock(data1);
    bc.addBlock(data2);
    expect(bc.isValidChain(bc.chain));
  })

  it('validates a valid chain', () => {
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  })

  it('invalidates a chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'Bad data';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  })

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('good data');
    bc2.chain[1].data = 'bad data';
    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })
})