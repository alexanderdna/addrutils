const { HDKey } = require('@scure/bip32');
const bip39 = require('@scure/bip39');
const { wordlist } = require('@scure/bip39/wordlists/english');
const { keccak_256 } = require('@noble/hashes/sha3');
const { bytesToHex: toHex } = require('@noble/hashes/utils');
const secp256k1 = require('@noble/secp256k1');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const thePath = "m/44'/60'/0'/0/";

function generateMnemonic() {
  return bip39.generateMnemonic(wordlist);
}

function generateAddress(/** @type {Uint8Array} */ privateKey) {
  const pub = secp256k1.getPublicKey(privateKey).slice(1);
  const hash = keccak_256(pub).slice(-20);
  return toChecksumAddress(toHex(hash));
}

function toChecksumAddress(/** @type string */ address) {
  const hashHex = toHex(keccak_256(address));
  let checksumAddress = '0x';
  for (let i = 0; i < address.length; ++i) {
    checksumAddress +=
      parseInt(hashHex[i], 16) >= 8 ? address[i].toUpperCase() : address[i];
  }
  return checksumAddress;
}

function printAddress(
  mnemonic,
  privateKey,
  accountIndex,
  showingMnemonic,
  showingPrivateKey,
  hidingAddress
) {
  let address;

  if (mnemonic == '' && privateKey == '') {
    mnemonic = generateMnemonic();
  }

  if (mnemonic != '') {
    const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
    const account = hdkey.derive(thePath + accountIndex);
    privateKey = '0x' + toHex(account.privateKey);
    address = generateAddress(account.privateKey);
  } else if (privateKey != '') {
  }
  if (showingMnemonic) {
    console.log(mnemonic);
  }
  if (showingPrivateKey) {
    console.log(privateKey);
  }
  if (!hidingAddress) {
    console.log(address);
  }
}

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .string('m')
  .nargs('m', 1)
  .default('m', '')
  .alias('m', 'mnemonic')
  .describe('m', 'Mnemonic phrase input')
  .string('p')
  .nargs('p', 1)
  .default('p', '')
  .alias('p', 'private-key')
  .describe('p', 'Private key input')
  .number('i')
  .nargs('i', 1)
  .default('i', 0)
  .alias('i', 'index')
  .describe(
    'i',
    'Account index (only applicable if using mnemonic phrase as input)'
  )
  .number('c')
  .nargs('c', 1)
  .default('c', 1)
  .alias('c', 'count')
  .describe('c', 'Number of addresses to generate')
  .boolean('show-mnemonic')
  .default('show-mnemonic', false)
  .describe('show-mnemonic', 'Also print mnemonic phrase in output')
  .boolean('show-private-key')
  .default('show-private-key', false)
  .describe('show-private-key', 'Also print private key in output')
  .boolean('hide-address')
  .default('hide-address', false)
  .describe('hide-address', 'Hide address in output')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version').argv;

let count = argv.count;
if (count <= 0) count = 1;
for (let i = 0; i < count; ++i) {
  printAddress(
    argv.mnemonic,
    argv.privateKey,
    argv.index,
    argv.showMnemonic,
    argv.showPrivateKey,
    argv.hideAddress
  );
}
