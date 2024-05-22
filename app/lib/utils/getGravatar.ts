import CryptoJS from "crypto-js";

function getGravatarUrl(email: string, size = 200) {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = CryptoJS.MD5(trimmedEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
}

export default getGravatarUrl;
