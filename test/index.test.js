import { hexToBytes } from '@noble/hashes/utils';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import {
  generateAccount,
  generateAddress,
  generateMnemonic,
  toChecksumedAddress,
} from '../src/index.js';

describe('account', () => {
  it('generates random account', () => {
    const account = generateAccount();
    const mnemonicWords = account.mnemonic.split(' ');
    expect(mnemonicWords.length).toEqual(12);
    expect(wordlist).toEqual(expect.arrayContaining(mnemonicWords));
    expect(account.privateKey).toMatch(/^0x[0-9A-Fa-f]{64}$/);
    expect(account.address).toMatch(/^0x[0-9A-Fa-f]{40}$/);
    expect(generateAddress(hexToBytes(account.privateKey.slice(2)))).toEqual(
      account.address
    );
  });
  it('generates correct account from mnemonic', () => {
    const mnemonic =
      'weasel kingdom transfer master firm culture festival write arrest squirrel kitten attack';
    const account = generateAccount(mnemonic);
    expect(account.mnemonic).toEqual(mnemonic);
    expect(account.privateKey).toEqual(
      '0x2a194c4e83d45f7373fd27f0b83e593f298b79976586910c086fdaec556d2c87'
    );
    expect(account.address).toEqual(
      '0x0784b774221f31D1fa8Ce041a850E6Ad5915656d'
    );
  });

  it('generates correct account from mnemonic and account index', () => {
    const mnemonic =
      'weasel kingdom transfer master firm culture festival write arrest squirrel kitten attack';
    const accountIndex = 2;
    const account = generateAccount(mnemonic, '', accountIndex);
    expect(account.mnemonic).toEqual(mnemonic);
    expect(account.privateKey).toEqual(
      '0xf582ceb36d32c8d4561b643d8e1131c541afcbdd2a66016e011bab71168a5595'
    );
    expect(account.address).toEqual(
      '0x9720b517bAfF0623424aF2406D191D7f76476Caf'
    );
  });

  it('generates correct account from private key', () => {
    const privateKey =
      '0x959b614d16c77c3b19a6e8ee047854fd3de7e03944e8c92339ab3b171fa866a2';
    const account = generateAccount('', privateKey);
    expect(account.mnemonic).toEqual('');
    expect(account.privateKey).toEqual(
      '0x959b614d16c77c3b19a6e8ee047854fd3de7e03944e8c92339ab3b171fa866a2'
    );
    expect(account.address).toEqual(
      '0xBF7CE55AA048E8e50d86775Abf2A392e9b6f03eE'
    );
  });

  it('generates correct account from private key w/o prefix', () => {
    const privateKey =
      '959b614d16c77c3b19a6e8ee047854fd3de7e03944e8c92339ab3b171fa866a2';
    const account = generateAccount('', privateKey);
    expect(account.mnemonic).toEqual('');
    expect(account.privateKey).toEqual(
      '0x959b614d16c77c3b19a6e8ee047854fd3de7e03944e8c92339ab3b171fa866a2'
    );
    expect(account.address).toEqual(
      '0xBF7CE55AA048E8e50d86775Abf2A392e9b6f03eE'
    );
  });

  it('generates correct address from private key', () => {
    const privateKey =
      '0x959b614d16c77c3b19a6e8ee047854fd3de7e03944e8c92339ab3b171fa866a2';
    const privateKeyBytes = hexToBytes(privateKey.slice(2));
    const address = generateAddress(privateKeyBytes);
    expect(address).toEqual('0xBF7CE55AA048E8e50d86775Abf2A392e9b6f03eE');
  });

  it('generates a 12-word mnemonic phrase', () => {
    const phrase = generateMnemonic();
    const words = phrase.split(' ');
    expect(words.length).toEqual(12);
    expect(wordlist).toEqual(expect.arrayContaining(words));
  });

  it('generates correct checksum address', () => {
    const address = '0x8d76de9387e882f526d57fc359fff3b83bd2f1e8';
    const checksumAddress = toChecksumedAddress(address);
    expect(checksumAddress).toEqual(
      '0x8d76De9387E882f526d57fC359FFf3B83bd2f1E8'
    );
  });

  it('throws when receives malformed mnemonic', () => {
    expect(() => {
      generateAccount('abc zzz');
    }).toThrow('Invalid mnemonic');
  });

  it('throws when receives malformed private key', () => {
    expect(() => {
      generateAccount('', 'zzz');
    }).toThrow('malformed private key');
  });

  it('throws when receives invalid account index', () => {
    expect(() => {
      generateAccount('', '', -1);
    }).toThrow('invalid account index');
  });

  it('throws when receives malformed address', () => {
    expect(() => {
      toChecksumedAddress('aal;skdjfal;');
    }).toThrow('malformed address');
  });

  it('throws when receives invalid private key', () => {
    expect(() => {
      generateAddress(new Uint8Array(2));
    }).toThrow('invalid private key');
  });
});
