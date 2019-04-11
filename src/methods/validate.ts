import {ReadingPlayer} from "eosplayer";
import {MykeyPlugin} from "eosplayer/build/lib/plugins";
import {Global} from "../global";

let readingPlayer: ReadingPlayer;

export const validate = async (data: {
    validatorIdentity: string,
    userIdentity: string,
    loginToken: string,
    secret: string,
    algorithm: string
}) => {
    const {node, urls} = Global.conf;
    readingPlayer = readingPlayer || new ReadingPlayer({node, urls});
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
