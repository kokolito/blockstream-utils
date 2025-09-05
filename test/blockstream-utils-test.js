#!/bin/node

const blockstreamUtil = require("../index.js");
const assert = require("assert");

// getRawTransaction

{
  (async () => {
    const txid =
      "5fd0b214d0bc9301e57ee1b29d5a6d39cbb5c76da5996734191f937881103f2c";
    const result = await blockstreamUtil.getRawTransaction(txid);
    assert(
      result ===
        "0100000000010143db04d23dd4248df638482b84209b183c720e34063f29f86e6cce3a333c5e600000000000feffffff02434a02000000000016001460c8eb433ec642c5b67fd4329588f9f63f9e098b0000000000000000226a201e6c63c60d53f0e796ba1d53f67a8db55350e5984e90734053aff07f5bbf13b902473044022067c14e4166f16bbf5b447b4166fc0984d4c9a4b186faab976b219bbd4af4624202207db4ccaff8c554d8ed1c1bf417e475ceb0a7b812a1b32acc19591cb88d3ef1e70121036698b19184212c2d480baadc62275785214547b8825c052e9a2e8a92af7842d9a2c30d00"
    );
  })();
}

// getTransactions

{
  (async () => {
    const blockHeight = "50000";
    const expectedArray = [
      "27f1d66f8a1ee5280f4e92508dcb647e954d53004905d08a75574daee4988360",
    ];
    const result = await blockstreamUtil.getTransactions(blockHeight);
    assert.deepStrictEqual(result, JSON.stringify(expectedArray));
  })();

  (async () => {
    const blockHeight = "100000";
    const expectedArray = [
      "8c14f0db3df150123e6f3dbbf30f8b955a8249b62ac1d1ff16284aefa3d06d87",
      "fff2525b8931402dd09222c50775608f75787bd2b87e56995a7bdd30f79702c4",
      "6359f0868171b1d194cbee1af2f16ea598ae8fad666d9b012c8ed2b79a236ec4",
      "e9a66845e05d5abc0ad04ec80f774a7e585c6e8db975962d069a522137b80c1d",
    ];
    const result = await blockstreamUtil.getTransactions(blockHeight);
    assert.deepStrictEqual(result, JSON.stringify(expectedArray));
  })();
}

// getHeader

{
  (async () => {
    const blockHeight = "902056";
    const result = await blockstreamUtil.getHeader(blockHeight);
    assert(
      result ===
        "00e0052087ebb26a069fb25c8f8d003d34a79db1a7d90c9d823602000000000000000000e5958bbb433676c62fa919230558ee0f947c90340824b7cb026f2f969da5e69bc0675568043a02179120ab10"
    );
  })();
}

// getTimestamp

{
  (async () => {
    const blockHeight = "902056";
    const result = await blockstreamUtil.getTimestamp(blockHeight);
    assert(result === 1750427584);
  })();
}

// isMerkleRoot
// isTransaction
// isOP_RETURN

{
  OP_RETURN =
    "1e6c63c60d53f0e796ba1d53f67a8db55350e5984e90734053aff07f5bbf13b9";
  txid = "5fd0b214d0bc9301e57ee1b29d5a6d39cbb5c76da5996734191f937881103f2c";
  merkleRoot =
    "452425a4ba340b808abdbfcd6c84cdbe6575596734417f227135362450723942";
  blockHeight = "902051";
  (async () => {
    let result = await blockstreamUtil.isMerkleRoot({
      merkleRoot: merkleRoot,
      blockHeight: blockHeight,
    });
    assert(result === true);
    result = await blockstreamUtil.isTransaction({
      txid: txid,
      blockHeight: blockHeight,
    });
    assert(result === true);
    result = await blockstreamUtil.isTransaction({
      txid: "6fd0b214d0bc9301e57ee1b29d5a6d39cbb5c76da5996734191f937881103f2c",
      blockHeight: blockHeight,
    });
    assert(result === false);
    result = await blockstreamUtil.isOP_RETURN({
      OP_RETURN: OP_RETURN,
      txid: txid,
    });
    assert(result === true);
    result = await blockstreamUtil.isOP_RETURN({
      OP_RETURN:
        "2e6c63c60d53f0e796ba1d53f67a8db55350e5984e90734053aff07f5bbf13b9",
      txid: txid,
    });
    assert(result === false);
    result = await blockstreamUtil.isOP_RETURN({
      OP_RETURN: OP_RETURN,
      txid: txid,
      blockHeight: blockHeight,
    });
    assert(result === true);
    result = await blockstreamUtil.isOP_RETURN({
      OP_RETURN: OP_RETURN,
      txid: txid,
      blockHeight: 100000,
    });
    assert(result === false);
  })();
}
