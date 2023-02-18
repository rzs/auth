import { exportJWK, exportPKCS8, exportSPKI, generateKeyPair, GenerateKeyPairOptions, importJWK, JWK, JWTPayload, jwtVerify, JWTVerifyResult, KeyLike, SignJWT } from "jose";

export interface Keys {
    publicKString:string;
    privateKString: string;
    publicK: KeyLike;
    privateK: KeyLike;
}

export class JWTSetup {
    static async generateKeys(): Promise<Keys> {
        const options: GenerateKeyPairOptions = {
            extractable: true,
        };
        const {publicKey, privateKey} = await generateKeyPair('RS256', options);
        const privateKeyString = await exportPKCS8(privateKey);
        const publicKeyString = await exportSPKI(publicKey);

        const keys: Keys = {
            publicKString: publicKeyString,
            privateKString: privateKeyString,
            publicK: publicKey,
            privateK: privateKey
        }
        return keys;
    }

    static async createAndSignJwt(privateKey:KeyLike, payload: JWTPayload): Promise<string> {
        const token = await new SignJWT(payload)
        .setProtectedHeader({typ:'JWT', alg: 'RS256'})
        .setIssuer('https://127.0.0.1:9000')
        .setSubject('userId')
        .setAudience('portal')
        .setExpirationTime(Math.floor(new Date().getTime() / 1000) + 300)
        .setIssuedAt().setNotBefore(Math.floor(new Date().getTime() / 1000))
        .sign(privateKey);
        return token;
    }

    static async generateJwks(publicKey: KeyLike, keyID: string) : Promise<JWK> {
        const jwk = await exportJWK(publicKey);
        jwk.kid=keyID;
        jwk.use='sig';
        jwk.alg='RS256'
        return jwk;
    }

    static async verifyToken(jwk: JWK, token: string) : Promise<JWTVerifyResult> {
        const parsedJwk = await importJWK(jwk, 'RS256');
        const status = await jwtVerify(token, parsedJwk);
        return status;
    }
}