// Script for encrypting messages
function toBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function encrypt(pwd, contents) {
  const encoder = new TextEncoder();

  const iv = new Uint8Array([
    163, 215, 143, 57, 240, 175, 190, 63, 61, 96, 44, 76,
  ]);
  const salt = encoder.encode("And a happy new year!");
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    await crypto.subtle.importKey("raw", encoder.encode(pwd), "PBKDF2", false, [
      "deriveBits",
      "deriveKey",
    ]),
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  const buffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(contents)
  );
  console.log(toBase64(buffer));
}
