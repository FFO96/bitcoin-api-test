# Bitcoin API test

API server in Typescript that supports the following operations:
+ Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin
address from a given seed and path
+ Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin
address, where n, m and addresses can be specified

## Operations
To implement the operations we have used bitcoinjs-lib, a popular node.js library for Bitcoin development. Each operation has an endpoint and required parameters, which will be discussed in more detail below.

#### HD SegWit address from seed and path
This operation makes use of the **/generatehd** endpoint with a **POST** method.  For the operation to work correctly, it is necessary to give a seed and a path. 

For the seed we have decided to follow bip39 and use a mnemonic seed, which will contain a sentence with a range of 12-24 words.

Therefore, the request must be accompanied by a json with the fields "bSeed" and "bPath", resulting in a body like this:
```
{
"bSeed":"seed with different words that we have to use for this operation",
"bPath":"m/44'/0'/0'/0'"
}
```

#### Multi-sig (n-out-of-m) P2SH address
This operation makes use of the **/generatemultisig** endpoint with a **POST** method.  For the operation to work correctly, it is necessary to give a "m" value, a "n" value and an array of m  bitcoin public keys.

Naturally, to obtain a multi-sig address, the value of "m" must be equal to the number of keys entered in the array and the value of "n" must be less than the value of "m".

Therefore, the request must be accompanied by a json with the fields "m", "n" and "bPublicKeys", resulting in a body like this:
```
{
"m": 4,
"n": 3,
"bPublicKeys":[
"026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
"02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
"023e4740d0ba639e28963f3476157b7cf2fb7c6fdf4254f97099cf8670b505ea59",
"03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9"
]
}
```

## Run the progam

1. Install the required packages and libraries: **npm install**
2. Start the server to send requests to it: **npm run start**

## References
+ bitcoinjs-lib: [https://github.com/bitcoinjs/bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
+ bip32: [https://github.com/bitcoinjs/bip32](https://github.com/bitcoinjs/bip32)
+ bip39: [https://github.com/bitcoinjs/bip39](https://github.com/bitcoinjs/bip39)
