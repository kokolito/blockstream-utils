const getRawTransaction = async (txid) => {
  const res = await fetch(`https://blockstream.info/api/tx/${txid}/hex`);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status} - ${await res.text()}`);
  }
  const raw = await res.text();
  return raw;
};

const getTransactions = async (blockHeight) => {
  let res = await fetch(
    `https://blockstream.info/api/block-height/${blockHeight}`
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status} - ${await res.text()}`);
  }
  const hash = await res.text();
  res = await fetch(`https://blockstream.info/api/block/${hash}/txids`);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status} - ${await res.text()}`);
  }
  const transactions = await res.text();
  return transactions;
};

const getHeader = async (blockHeight) => {
  let res = await fetch(
    `https://blockstream.info/api/block-height/${blockHeight}`
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status} - ${await res.text()}`);
  }
  const hash = await res.text();
  res = await fetch(`https://blockstream.info/api/block/${hash}/header`);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status} - ${await res.text()}`);
  }
  const header = await res.text();
  return header;
};

const getTimestamp = async (blockHeight) => {
  let res = await fetch(
    `https://blockstream.info/api/block-height/${blockHeight}`
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status} - ${await res.text()}`);
  }
  const hash = await res.text();
  res = await fetch(`https://blockstream.info/api/block/${hash}`);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status} - ${await res.text()}`);
  }
  const info = await res.json();
  return info.timestamp;
};

const isMerkleRoot = async (arg) => {
  const merkleRoot = arg.merkleRoot;
  const blockHeight = arg.blockHeight;

  const header = await getHeader(blockHeight);
  toggledMerkleRoot = merkleRoot
    .match(/.{1,2}/g)
    .reverse()
    .join("");
  return header.includes(toggledMerkleRoot);
};

const isTransaction = async (arg) => {
  const txid = arg.txid;
  const blockHeight = arg.blockHeight;
  const transactions = await getTransactions(blockHeight);
  return transactions.includes(txid);
};

const isOP_RETURN = async (arg) => {
  const OP_RETURN = arg.OP_RETURN;
  const txid = arg.txid;
  const blockHeight = arg.blockHeight;
  const raw = await getRawTransaction(txid);
  let condition = raw.includes(OP_RETURN);
  if (blockHeight != null) {
    const otherCondition = await isTransaction({
      txid: txid,
      blockHeight: blockHeight,
    });
    condition = condition && otherCondition;
  }
  return condition;
};

module.exports = {
  getRawTransaction,
  getTransactions,
  getHeader,
  getTimestamp,
  isMerkleRoot,
  isTransaction,
  isOP_RETURN,
};
