# addrutils

Utilities for Ethereum address generation.

## CLI

### The fastest way

```bash
node src/cli.js
```

### Full usage information

```
Usage: node cli.js [options]

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

## Containerized execution

For better security, this script should be run in an offline
environment. One possible way to do this is a Docker container
without network interface.

I created a Batch script to run such container, which is based
on `alpine:3.17`. The script will package the program using `pkg`,
load it onto the container, run the program and redirect its
output to a text file within the same directory, then stop
and remove the container as well as other temporary files.

The Batch script is `generate-in-container.bat`. You are advised
to have a look at it to make sure it works the way you prefer.

## API

See [API.md](./API.md)

## Contribute

This repo is in its early stage as I am learning things.
Please feel free to give feedbacks. Thank you!
