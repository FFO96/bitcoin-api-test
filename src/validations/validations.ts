import { Response, Request } from "express";

// Function for validating mnemonic seed phrase length
function validateSeedLength(res: Response, mnemonicSeed: string) {
    const arraySeed = mnemonicSeed.trim().split(" ");
        if(arraySeed.length < 12  || arraySeed.length > 24){
            res.status(400).send('The mnemonic seed must contain between 12 and 24 words.');
        }
    }
// Function for validating consistency between the multi-sig function parameters
function validateMultisig(res: Response, bAdresses: string[], m: number, n: number) {
    if (bAdresses.length != m) {
        res.status(400).send('The \"m\" parameter must be equal to the length of \"bAdresses\"');
    } if (m <= n) {
        res.status(400).send('The \"n\" parameter must be less than \"m\"');
    }
}

export { validateSeedLength, validateMultisig }