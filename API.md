## Functions

<dl>
<dt><a href="#generateMnemonic">generateMnemonic()</a> ⇒ <code>string</code></dt>
<dd><p>Returns a cryptographically-safe random mnemonic phrase
consisting of 12 English words.</p>
</dd>
<dt><a href="#generateAddress">generateAddress(privateKey)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a checksumed address from the given private key.</p>
</dd>
<dt><a href="#toChecksumedAddress">toChecksumedAddress(address)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a checksumed address.</p>
</dd>
<dt><a href="#generateAccount">generateAccount(mnemonic, privateKey, accountIndex)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates an account from the given arguments. If no arguments are provided,
randomly generates a mnemonic phrase and creates an account from it.</p>
</dd>
</dl>

<a name="generateMnemonic"></a>

## generateMnemonic() ⇒ <code>string</code>

Returns a cryptographically-safe random mnemonic phrase
consisting of 12 English words.

**Kind**: global function  
**Returns**: <code>string</code> - a mnemonic phrase  
<a name="generateAddress"></a>

## generateAddress(privateKey) ⇒ <code>string</code>

Returns a checksumed address from the given private key.

**Kind**: global function  
**Returns**: <code>string</code> - a checksumed address

| Param      | Type                    | Description            |
| ---------- | ----------------------- | ---------------------- |
| privateKey | <code>Uint8Array</code> | private key byte array |

<a name="toChecksumedAddress"></a>

## toChecksumedAddress(address) ⇒ <code>string</code>

Returns a checksumed address.

**Kind**: global function  
**Returns**: <code>string</code> - a checksumed address

| Param   | Type                | Description       |
| ------- | ------------------- | ----------------- |
| address | <code>string</code> | any valid address |

<a name="generateAccount"></a>

## generateAccount(mnemonic, privateKey, accountIndex) ⇒ <code>Object</code>

Creates an account from the given arguments. If no arguments are provided,
randomly generates a mnemonic phrase and creates an account from it.

**Kind**: global function  
**Returns**: <code>Object</code> - account details

| Param        | Type                | Description                     |
| ------------ | ------------------- | ------------------------------- |
| mnemonic     | <code>string</code> | mnemonic phrase (default empty) |
| privateKey   | <code>string</code> | private key (default empty)     |
| accountIndex | <code>number</code> | account index (default 0)       |
