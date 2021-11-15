import { Response, Request } from "express";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import * as bip32 from "bip32";
import { validateSeedLength, validateMultisig } from "../validations/validations";

// Function for generating a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
function hdSegWit(req: Request, res: Response) {

    const mnemonicSeed = req.body.bSeed;
    const bPath = req.body.bPath;

    // Mnemonic seed phrase length validation
    validateSeedLength(res, mnemonicSeed);

    try {
        const seed = bip39.mnemonicToSeedSync(mnemonicSeed, "");
        const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
        const account = root.derivePath(bPath);
        let publicKey = account.publicKey;
        const { address } = bitcoin.payments.p2wpkh({ pubkey: publicKey });
        res.json({
            "result": address
        });
    } catch (Error) {
        res.send(Error.message);
    }
}

// Function for generating an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address
function multisig(req: Request, res: Response) {

    const bPublicKeys: string[] = req.body.bPublicKeys;
    const m: number = req.body.m;
    const n: number = req.body.n;

    // multi-sig parameters validation
    validateMultisig(res, bPublicKeys, m, n);

    try {
        const pubKeys = bPublicKeys.map(hex => Buffer.from(hex, 'hex'));
        const { address } = bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2ms({ m: m, pubkeys: pubKeys }) });
        res.status(200).send("The created Multisignature P2SH bitcoin address is: " + address);
    } catch (Error) {
        res.send(Error.message);
    }
}

export { hdSegWit, multisig }