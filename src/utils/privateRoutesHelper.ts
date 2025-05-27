import { AUTH_CONFIG } from "@/constants/routes";

function isExactPublicPath(pathname: string) {
    return AUTH_CONFIG.exactPublicPaths.includes(pathname);
}

function isPublicPathPrefix(pathname: string) {
    return AUTH_CONFIG.publicPathPrefixes.some(prefix => pathname.startsWith(prefix));
}

function isPrivatePath(pathname: string) {
    return AUTH_CONFIG.privatePathPrefixes.some(prefix => pathname.startsWith(prefix));
}


export {
    isExactPublicPath,
    isPublicPathPrefix,
    isPrivatePath
}