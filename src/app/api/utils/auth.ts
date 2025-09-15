import crypto from "crypto";

export const marvelUrl = "https://gateway.marvel.com:443/v1/public";
export const publicKey = process.env.MARVEL_PUBLIC_KEY;
export const privateKey = process.env.MARVEL_PRIVATE_KEY;

export function getMarvelAuthParams() {
  if (!publicKey || !privateKey) {
    throw new Error("Marvel API keys not configured");
  }

  const ts = Date.now().toString();
  const hash = crypto
    .createHash("md5")
    .update(ts + privateKey + publicKey)
    .digest("hex");

  return {
    ts,
    apikey: publicKey,
    hash,
  };
}
