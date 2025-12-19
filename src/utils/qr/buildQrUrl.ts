// src/lib/qr/buildQrUrl.ts
export function buildQrUrl(baseUrl: string, userCode: string): string {
    const u = new URL(baseUrl);
    u.searchParams.set('userCode', userCode);
    return u.toString();
}
