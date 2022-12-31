# addrutils

Utilities for Ethereum address generation.

## Usage

```
Usage: node index.js [options]

Options:
  -m, --mnemonic          Mnemonic phrase input           [string] [default: ""]
  -p, --private-key       Private key input               [string] [default: ""]
  -i, --index             Account index (only applicable if using mnemonic
                          phrase as input)                 [number] [default: 0]
  -c, --count             Number of addresses to generate (only applicable if -m
                          and -p are not provided)         [number] [default: 1]
      --hide-mnemonic     Hide mnemonic phrase in output
                                                      [boolean] [default: false]
      --hide-private-key  Hide private key in output  [boolean] [default: false]
      --hide-address      Hide address in output      [boolean] [default: false]
  -h, --help              Show help                                    [boolean]
  -v, --version           Show version number                          [boolean]

This program can be called without any options. In such case, it will generate a
cryptographically-safe random mnemonic phrase. User can provide the -i option to
change the account index in the derivation path (default is 0), as well as the
-c option to change the number of accounts they wish to generate.

User can provide an existing mnemonic phrase using the -m option. In such case,
the private key and address will be generated from this mnemonic phrase. User
can provide the -i option to chane the account index. The -c option will not be
available since there is only one mnemonic phrase.

Instead, user can provide a private key using the -p option. In such case,
mnemonic phrase is not available, as well as the -i and -c options.
```
