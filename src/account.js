import { HDKey } from '@scure/bip32';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { keccak_256 } from '@noble/hashes/sha3';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import * as secp256k1 from '@noble/secp256k1';

const thePath = "m/44'/60'/0'/0/";

export function generateMnemonic() {
  return bip39.generateMnemonic(wordlist);
}

/**
 *
 * @param {Uint8Array} privateKey private key byte array
 * @returns {string} a checksumed address
 */
export function generateAddress(privateKey) {
  if (privateKey.length != 32) {
    throw new Error('invalid private key');
  }
  const pub = secp256k1.getPublicKey(privateKey).slice(1);
  const hash = keccak_256(pub).slice(-20);
  return toChecksumAddress(bytesToHex(hash));
}

/**
 *
 * @param {string} address any valid address
 * @returns {string} a checksum address
 */
export function toChecksumAddress(address) {
  if (!/^(0x)?[0-9A-Fa-f]{40}$/.test(address)) {
    throw new Error('malformed address');
  }
  address = address.toLowerCase();
  if (address.startsWith('0x')) {
    address = address.slice(2);
  }
  const hashHex = bytesToHex(keccak_256(address));
  let checksumAddress = '0x';
  for (let i = 0; i < address.length; ++i) {
    checksumAddress +=
      parseInt(hashHex[i], 16) >= 8 ? address[i].toUpperCase() : address[i];
  }
  return checksumAddress;
}

/**
 * Creates an account from the given arguments. If no arguments are provided,
 * randomly generates a mnemonic phrase and creates an account from it.
 * @param {string} mnemonic mnemonic phrase (default empty)
 * @param {string} privateKey private key (default empty)
 * @param {number} accountIndex account index (default 0)
 * @returns {{ mnemonic: string, privateKey: string, address: string}} account details
 */
export function generateAccount(
  mnemonic = '',
  privateKey = '',
  accountIndex = 0
) {
  if (accountIndex < 0) {
    throw new Error('invalid account index');
  }

  if (mnemonic == '' && privateKey == '') {
    mnemonic = generateMnemonic();
  }

  if (mnemonic != '') {
    const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
    const account = hdkey.derive(thePath + accountIndex);
    return {
      mnemonic,
      privateKey: '0x' + bytesToHex(account.privateKey),
      address: generateAddress(account.privateKey),
    };
  } else if (privateKey != '') {
    if (!/^(0x)?[0-9A-Fa-f]{64}$/.test(privateKey)) {
      throw new Error('malformed private key');
    }

    const hasPrefix = privateKey.startsWith('0x');
    const privateKeyBytes = hexToBytes(
      hasPrefix ? privateKey.slice(2) : privateKey
    );
    return {
      mnemonic: '',
      privateKey: hasPrefix ? privateKey : '0x' + privateKey,
      address: generateAddress(privateKeyBytes),
    };
  }
}
