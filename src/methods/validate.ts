import {ReadingPlayer} from "eosplayer";
import {MykeyPlugin} from "eosplayer/build/lib/plugins";

const eos_read = {
    node: {
        chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
        mockTransactions: () => null,
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
    },
    urls: [
        "https://proxy.eosnode.tools"
    ],
};

let readingPlayer: ReadingPlayer;


export const validate = async (data: {
    validatorIdentity: string,
    userIdentity: string,
    loginToken: string,
    secret: string,
    algorithm: string
}) => {

    readingPlayer = readingPlayer || new ReadingPlayer(eos_read);
    const {validatorIdentity, userIdentity, loginToken, secret, algorithm} = data;
    if (validatorIdentity !== 'eos') {
        throw new Error(`validator identity error, expected eos, got ${validatorIdentity}.`);
    }
    const myKeyPlugin = new MykeyPlugin();

    const results = await Promise.all([
        readingPlayer.chain.validateSign(secret, loginToken, userIdentity, "active", myKeyPlugin),
        readingPlayer.chain.validateSign(secret, loginToken, userIdentity, "owner", myKeyPlugin)
    ]);
    return results.reduce((a, b) => a || b);
}
