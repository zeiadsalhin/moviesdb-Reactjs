
// Makes url compatible and detectable by authenticator

export const fixOtpAuthUri = (uri) => {
    const url = new URL(uri.replace("otpauth://", "https://dummy.com/")); // Temp domain
    const secret = url.searchParams.get("secret");
    const issuer = encodeURIComponent(url.searchParams.get("issuer"));
    const email = encodeURIComponent(url.pathname.split(":")[1]);

    return `otpauth://totp/${issuer}:${email}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
};
