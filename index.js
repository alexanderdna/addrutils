const { HDKey } = require('@scure/bip32');
const bip39 = require('@scure/bip39');
const { wordlist } = require('@scure/bip39/wordlists/english');
const { keccak_256 } = require('@noble/hashes/sha3');
const { bytesToHex: toHex, hexToBytes } = require('@noble/hashes/utils');
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
  hidingMnemonic,
  hidingPrivateKey,
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
    mnemonic = '<not available>';
    if (!/^0x[0-9A-Fa-f]{64}$/.test(privateKey)) {
      console.error('Invalid private key');
      process.exit(1);
      return;
    }

    const privateKeyBytes = hexToBytes(privateKey.slice(2));
    address = generateAddress(privateKeyBytes);
  }

  if (!hidingMnemonic) {
    console.log(mnemonic);
  }
  if (!hidingPrivateKey) {
    console.log(privateKey);
  }
  if (!hidingAddress) {
    console.log(address);
  }
}

const argv = yargs(hideBin(process.argv))
  .scriptName('addrutils')
  .usage('Usage: $0 [options]')
  .option('m', {
    type: 'string',
    nargs: 1,
    default: '',
    alias: 'mnemonic',
    describe: 'Mnemonic phrase input',
  })
  .option('p', {
    type: 'string',
    nargs: 1,
    default: '',
    alias: 'private-key',
    describe: 'Private key input',
  })
  .option('i', {
    type: 'number',
    nargs: 1,
    default: 0,
    alias: 'index',
    describe:
      'Account index (only applicable if using mnemonic phrase as input)',
  })
  .option('c', {
    type: 'number',
    nargs: 1,
    default: 1,
    alias: 'count',
    describe:
      'Number of addresses to generate (only applicable if -m and -p are not provided)',
  })
  .option('hide-mnemonic', {
    type: 'boolean',
    default: false,
    describe: 'Hide mnemonic phrase in output',
  })
  .option('hide-private-key', {
    type: 'boolean',
    default: false,
    describe: 'Hide private key in output',
  })
  .option('hide-address', {
    type: 'boolean',
    default: false,
    describe: 'Hide address in output',
  })
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .epilog(
    'This program can be called without any options. ' +
      'In such case, it will generate a cryptographically-safe random mnemonic phrase. ' +
      'User can provide the -i option to change the account index in the derivation path (default is 0), ' +
      'as well as the -c option to change the number of accounts they wish to generate.\n'
  )
  .epilog(
    'User can provide an existing mnemonic phrase using the -m option. ' +
      'In such case, the private key and address will be generated from this mnemonic phrase. ' +
      'User can provide the -i option to chane the account index. ' +
      'The -c option will not be available since there is only one mnemonic phrase.\n'
  )
  .epilog(
    'Instead, user can provide a private key using the -p option. ' +
      'In such case, mnemonic phrase is not available, as well as the -i and -c options.'
  ).argv;

let count = argv.count;
if (count <= 0) count = 1;
for (let i = 0; i < count; ++i) {
  printAddress(
    argv.mnemonic,
    argv.privateKey,
    argv.index,
    argv.hideMnemonic,
    argv.hidePrivateKey,
    argv.hideAddress
  );
}
