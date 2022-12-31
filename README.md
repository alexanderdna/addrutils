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
  -c, --count             Number of addresses to generate  [number] [default: 1]
      --show-mnemonic     Also print mnemonic phrase in output
                                                      [boolean] [default: false]
      --show-private-key  Also print private key in output
                                                      [boolean] [default: false]
      --hide-address      Hide address in output      [boolean] [default: false]
  -h, --help              Show help                                    [boolean]
  -v, --version           Show version number                          [boolean]
```

If both `-m` and `-p` options are provided, only `-m` option is used.

If neither `-m` nor `-p` is provided, a random mnemonic is generated.
